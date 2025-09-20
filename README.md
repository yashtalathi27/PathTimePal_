# PathTimePal_

PathTimePal_ is a full-stack application designed to connect job seekers and recruiters, featuring real-time chat, job posting, and machine learning capabilities.

## Project Structure

- **backend/**: Node.js/Express server, API routes, controllers, models, and database connections.
- **frontend/**: React app (Vite), UI components, pages, context, and utilities.
- **ML/**: Python scripts for machine learning, job data processing, and integration.

## Features
- User authentication and profile management
- Job posting and application system
- Real-time chat between users
- Machine learning for job recommendations
- Text translation (NLP)
- Natural language understanding for improved job matching

## Getting Started

### Backend
1. Navigate to `backend/`.
2. (Recommended) Use Node.js v18+ and install dependencies:
	```sh
	cd backend
	npm install
	```
3. Set environment variables in a `.env` file for database and secrets. Example:
	```env
	MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
	JWT_SECRET=your_jwt_secret_key
	PORT=5000
	```
4. Start the server:
	```sh
	npm start
	```

### Frontend
1. Navigate to `frontend/`.
2. (Recommended) Use Node.js v18+ and install dependencies:
	```sh
	cd frontend
	npm install
	```
3. Set environment variables in a `.env` file for API endpoints and keys. Example:
	```env
	VITE_API_URL=http://localhost:5000/api
	VITE_GOOGLE_CLIENT_ID=your_google_client_id
	```
4. Start the development server:
	```sh
	npm run dev
	```

### ML
1. Navigate to `ML/`.
2. (Recommended) Create and activate a virtual environment:
	```sh
	python -m venv venv
	.\venv\Scripts\activate
	```
3. Install dependencies:
	```sh
	pip install -r requirements.txt
	```
4. Run ML scripts as needed:
	```sh
	python main.py
	```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

# PathTimePal_