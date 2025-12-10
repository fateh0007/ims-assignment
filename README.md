
# LMS Final (no hard-coded data)

This version removes hard-coded course data and loads everything from the backend / MongoDB.

## Run backend

cd backend
cp .env.example .env
npm install
npm run seed     # optional, creates sample course with slug 'introduction-to-ml'
npm run dev

Backend runs at http://localhost:5001

## Run frontend

cd frontend
cp .env.example .env
npm install
npm run dev

Frontend runs at http://localhost:3000

Notes:
- Home page fetches all courses dynamically.
- Course detail and LMS load course by slug (no hardcoded fallback).
- Admin Upload accepts optional query param `?redirect=/course/your-slug` to redirect back to a course page after upload.
