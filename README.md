# 📝 NoteApp

A full-stack note-taking application with Google Sign-In and OTP-based signup.

## 🔧 Tech Stack

- Frontend: React (Vite) + Tailwind CSS
- Backend: Node.js + Express + MongoDB
- Auth: Google OAuth + OTP Login
- Deployment: Render

---

## 🚀 Getting Started

### 1. Clone the repository

```
git clone https://github.com/ankitank08/NoteApp.git
cd NoteApp
```

## 🔨 Frontend Setup
```
cd frontend
npm install

```

## ➕ Add .env file in /frontend
```
VITE_BACKEND_URL=https://noteapp-tz9a.onrender.com
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here

```

## ▶️ Run Frontend Locally
```
npm run dev

```

## 🔧 Backend Setup
```
cd backend
npm install

```
## ➕ Add .env file in /backend
```
PORT=5000
MONGO_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret

```
## ▶️ Run Backend Locally
```
node index.js

```
## ✅ Features
```
Signup with OTP
Login with Google
Create, read, and manage notes
Protected routes using JWT
Fully responsive UI

```

