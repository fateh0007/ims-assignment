# Learning Management System (LMS)
A modern Learning Management System built with MERN stack (MongoDB, Express.js, React, Node.js) featuring document upload, AI-powered summarization, and course management.

## 🚀 Features

- **Course Management**: Create and manage courses with sections and lessons
- **Document Upload**: Upload and store various document types (PDF, TXT, DOC, DOCX, MD)
- **AI-Powered Summarization**: Automatically generate summaries of uploaded documents
- **Responsive Design**: Works on desktop and mobile devices
- **User Progress Tracking**: Track course completion progress
- **Admin Dashboard**: Easy content management interface

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **AI Integration**: Google Gemini API
- **File Storage**: Local filesystem
- **Payment Integration**: Razorpay

## 📦 Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Google Gemini API Key (for AI summarization)

## 🚀 Getting Started

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Update .env with your configuration
npm start