from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import numpy as np
import ast
import geocoder
from nltk.stem import PorterStemmer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.neighbors import NearestNeighbors

# Load and clean data
data = pd.read_csv("jobs_converted_utf8.csv")
extra = pd.read_csv("jobs_converted_utf8.csv")
data = data[['jobId','title','category', 'tags', 'skills', 'location.city', 'salary.amount', 'employer.name', 'latitude', 'longitude', 'recid', 'description', 'requirements']]
data.dropna(inplace=True)

def convert(text):
    return [item.strip() for item in text.replace(", and", ",").split(",")]

def torep(text):
    return text.replace("-", " ")

def format_str_list(ls):
    return ast.literal_eval(ls)

def remove_space(lst):
    return [x.replace(" ", "") for x in lst]

def convert_to_list(num):
    return [num]

data['employer.name'] = data['employer.name'].apply(convert).apply(remove_space)
data['category'] = data['category'].apply(convert)
data['name'] = data['title'].apply(convert).apply(remove_space)
data['city'] = data['location.city'].apply(convert)
data['tags'] = data['tags'].apply(torep).apply(format_str_list).apply(remove_space)
data['skills'] = data['skills'].apply(format_str_list).apply(remove_space)
data['salary'] = data['salary.amount'].apply(convert_to_list)

data['tag'] = data['city'] + data['name'] + data['category'] + data['tags'] + data['skills']

new_df = data[['jobId', 'title', 'salary.amount', 'location.city', 'tag', 'latitude', 'longitude', 'recid', 'description', 'requirements', 'employer.name']]
new_df['tag'] = new_df['tag'].apply(lambda x: " ".join(map(str, x))).str.lower()

ps = PorterStemmer()
def stems(text):
    return " ".join([ps.stem(i) for i in text.split()])
new_df['tag'] = new_df['tag'].apply(stems)

cv = CountVectorizer(max_features=5000, stop_words='english')
vector = cv.fit_transform(new_df['tag']).toarray()
similarity = cosine_similarity(vector)

ALLOWED_CITIES = {"Bangalore", "Mysore", "Mumbai", "Pune", "Delhi", "Lucknow", "Ahmedabad"}
CITY_COORDINATES = {
    "Bangalore": (12.9716, 77.5946), "Mysore": (12.2958, 76.6394),
    "Mumbai": (19.0760, 72.8777), "Pune": (18.5204, 73.8567),
    "Delhi": (28.7041, 77.1025), "Lucknow": (26.8467, 80.9462),
    "Ahmedabad": (23.0225, 72.5714),
}

# FastAPI setup
app = FastAPI()

class RecommendRequest(BaseModel):
    title: str
    city: str = None
    salary: float = None
    job: str = None

class JobInput(BaseModel):
    title: str
    jobLevel: str
    city: str
    tags: list[str]
    minSalary: int
    maxSalary: int
    description: str

@app.post("/add-job")
async def add_job(job: JobInput):
    new_job = {
        "jobId": "101",
        "title": job.title,
        "category": "General",
        "tags": str(job.tags),
        "skills": str(["python"]),
        "salary.amount": str(job.maxSalary),
        "location.city": job.city,
        "location.area": "central",
        "employer.name": "New Corp",
        "description": job.description,
        "latitude": 0.0,
        "longitude": 0.0,
    }
    df = pd.read_csv("jobs_converted_utf8.csv")
    df = pd.concat([df, pd.DataFrame([new_job])], ignore_index=True)
    df.to_csv("jobs_converted_utf8.csv", index=False)
    return {"status": "Job added"}

@app.post("/recommends")
async def recommend_endpoint(req: RecommendRequest):
    title = req.title
    city = req.city
    salary = req.salary

    index = new_df[new_df['title'].str.contains(title, case=False, na=False)].index
    if len(index) == 0:
        return {"message": f"No jobs found for title: {title}"}

    distances = sorted(list(enumerate(similarity[index[0]])), reverse=True, key=lambda x: x[1])
    rec_list = []

    for i, dist in distances[1:50]:
        job_city = new_df.iloc[i]['location.city']
        if job_city not in ALLOWED_CITIES:
            continue
        rec_list.append({
            'jobId': new_df.iloc[i].jobId,
            'title': new_df.iloc[i].title,
            'city': job_city,
            'salary': new_df.iloc[i]['salary.amount'],
            'similarity': dist,
            'latitude': new_df.iloc[i]['latitude'],
            'longitude': new_df.iloc[i]['longitude'],
            'recid': new_df.iloc[i]['recid'],   
            'description': new_df.iloc[i]['description'],
            'requirements': new_df.iloc[i]['requirements'],
            'employer.name': new_df.iloc[i]['employer.name'],
        })

    rec = pd.DataFrame(rec_list)
    if rec.empty:
        return {"message": "No job recommendations found in the specified cities."}

    rec['title_match'] = rec['title'].str.contains(title, case=False, na=False).astype(int)

    if city in ALLOWED_CITIES:
        city_lat, city_lon = CITY_COORDINATES[city]
    else:
        g = geocoder.ip('me')
        if g.latlng:
            city_lat, city_lon = g.latlng
        else:
            return {"message": "Could not determine user location from IP."}

    user_location = np.radians([[city_lat, city_lon]])
    job_locations = np.radians(rec[['latitude', 'longitude']].to_numpy())

    nbrs = NearestNeighbors(n_neighbors=min(20, len(job_locations)), metric="haversine").fit(job_locations)
    distances, indices = nbrs.kneighbors(user_location)
    within_radius = np.degrees(distances) * 111 <= 500
    filtered_indices = indices[0][within_radius[0]]
    rec = rec.iloc[filtered_indices]

    rec = rec.sort_values(by=['title_match', 'similarity'], ascending=[False, False])
    #print(order)
    return rec.head(20).to_dict(orient='records')
   


# Run with python main.py
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

