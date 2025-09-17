
# 📖 Blog Platform - Internship Assignment

## 📌 Overview
This is a *MERN stack* blog platform built as part of the *Software Engineering Internship Assignment (October 2025 - Mitt Arv)*.  
It demonstrates *full-stack development* with authentication, blog management, and protected routes.

---

## 🚀 Tech Stack
- *Frontend*: React, React Router, Axios  
- *Backend*: Node.js, Express.js  
- *Database*: MongoDB Atlas  
- *Authentication*: JWT (JSON Web Tokens)  
- *Tools*: Postman, VS Code, Git  

---

## ⚙ Features
- 🔐 User *Register & Login* with JWT auth  
- ✍ Create, Edit, Delete Blogs  
- 📖 View all blogs & single blog  
- 👤 Profile page with user details + blogs  
- 🛡 Protected APIs with middleware  

---

## 🔧 Installation

### 1. Clone Repository
```BASH
git clone <repo-link>
cd BLOG_PLATFORM_INTERNSHIP

#2. BACKEND SETUP

cd backend 
npm install

CREATEA .env file
MONGO_URI= "mongodb+srv://aneelgunja123:Aneel1234@cluster0.8bmhv4r.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0"

SECRET_KEY= "mysecretkey"
PORT = 5000

RUN BACKEND

npm run dev

#3. FRONTEND SETUP
cd frontend
npm install
npm start


#4. API Endpoints

User Routes

POST /api/users/register → Register user

POST /api/users/login → Login user

GET /api/users/me → Get logged-in user profile


Blog Routes

GET /api/blogs → Get all blogs

GET /api/blogs/:id → Get blog by ID

POST /api/blogs → Create blog (Protected)

PUT /api/blogs/:id → Update blog (Protected)

DELETE /api/blogs/:id → Delete blog (Protected)



---

#5 Proof of Work

✔ Register & Login working 

✔ Blog CRUD tested

✔ Profile API returns user + blogs

✔ Frontend integrated with backend


