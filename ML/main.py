from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
import pandas as pd
from fastapi.responses import JSONResponse
import numpy as np
import pandas as pd

import os

data = pd.read_csv('jobs.csv')
data = data[['jobId','title','type','category', 'tags', 'skills', 'salary.amount', 'location.city', 'location.area', 'employer.name','description']]

data['city'] = data['location.city']
data['name'] = data['title']
data['salary'] = data['salary.amount']
data['job'] = data['type']
data['employer.name'] = data['employer.name']
data['description']=data['description']

def convert(text):
    result = [item.strip() for item in text.replace(", and", ",").split(",")]
    return result;

data['employer.name'] = data['employer.name'].apply(convert)
data['description']=data['description'].apply(convert)
data['category'] = data['category'].apply(convert)
data['name'] = data['name'].apply(convert)
data['city'] = data['city'].apply(convert)

def torep(text):
    result = text.replace("-", " ")
    return result;

data['type'] = data['type'].apply(torep)
data['tags'] = data['tags'].apply(torep)
data['job'] = data['job'].apply(torep)

import ast

def format(ls):
    ls = ast.literal_eval(ls)
    return ls;

data['tags'] = data['tags'].apply(format)
data['skills'] = data['skills'].apply(format)


def remove_space(word):
    l = []
    for i in word:
        l.append(i.replace(" ",""))
        
    return l

data['tags'] = data['tags'].apply(remove_space)
data['skills'] = data['tags'].apply(remove_space)
# data['employer.name'] = data['employer.name'].apply(remove_space)
data['name'] = data['name'].apply(remove_space)
data['location.area'] = data['location.area'].apply(convert)
data['job'] = data['job'].apply(convert)
data['location.area'] = data['location.area'].apply(remove_space)
data['job'] = data['job'].apply(remove_space)

def convert_to_list(num):
    return [num]

data['salary'] = data['salary'].apply(convert_to_list)

data['tag'] = data['city'] + data['name'] + data['job'] + data['salary'] + data['category'] + data['tags'] + data['skills'] + data['location.area'] + data['employer.name']+data['description']

new_df = data[['jobId', 'title', 'type', 'salary.amount', 'location.city', 'tag','employer.name','description']]

new_df['tag'] = new_df['tag'].apply(lambda x: " ".join(map(str, x)))
new_df['tag'] = new_df['tag'].apply(lambda x: x.lower())

import nltk 
from nltk.stem import PorterStemmer
ps = PorterStemmer()

def stems(text):
    l = []
    for i in text.split():
        l.append(ps.stem(i))
        
    return " ".join(l)

new_df['tag'] = new_df['tag'].apply(stems)

from sklearn.feature_extraction.text import CountVectorizer
cv = CountVectorizer(max_features = 5000, stop_words = 'english')

vector = cv.fit_transform(new_df['tag']).toarray()

from sklearn.metrics.pairwise import cosine_similarity

similarity = cosine_similarity(vector)

app = FastAPI()


class RecommendRequest(BaseModel):
    title: str
    city: str = None
    salary: float = None
    job: str = None



@app.post("/recommends")
async def recommend_endpoint(req: RecommendRequest):  
    print(req.model_dump())  

    title = req.title
    city = req.city
    salary = req.salary
    job = req.job
    print(salary)
    
    index = new_df[new_df['title'].str.contains(title, case=False, na=False)].index
    
    if len(index) == 0:
        print(f"No jobs found with title: {title}")
        return
    
    distances = sorted(list(enumerate(similarity[index[0]])), reverse=True, key=lambda x: x[1])
    rec = pd.DataFrame(columns=['jobId', 'title', 'city', 'type', 'salary', 'similarity'])

    
    for i, dist in distances[1:20]:
        row = pd.DataFrame({
            'jobId': [new_df.iloc[i].jobId],
            'title': [new_df.iloc[i].title],
            'city': [new_df.iloc[i]['location.city']],
            'type': [new_df.iloc[i]['type']],
            'salary': [new_df.iloc[i]['salary.amount']],
            'similarity': [dist] ,
            'employer': [", ".join(new_df.iloc[i]['employer.name'])],
            'description': [", ".join(new_df.iloc[i]['description'])]
        })
        rec = pd.concat([rec, row], ignore_index=True)
      

   
    rec['city_priority'] = rec['city'].apply(lambda x: 1 if city and x.lower() == city.lower() else 0)
    rec['type_priority'] = rec['type'].apply(lambda x: 1 if job and x.lower() == job.lower() else 0)
    rec['salary_priority'] = rec['salary'].apply(lambda x: 1 if salary and x >= salary else 0)

   
    rec['total_priority'] = (
        rec['similarity'] * 50 +
        rec['city_priority'] * 30 +    
        rec['type_priority'] * 10 +   
        rec['salary_priority'] * 5
    )
    

    rec = rec.sort_values(by='total_priority', ascending=False).drop(
        ['total_priority', 'city_priority', 'type_priority', 'salary_priority'], axis=1
    )

    print("Recommendations:")
    print(rec.head(10))

    return rec.head(10).to_dict(orient='records')

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
