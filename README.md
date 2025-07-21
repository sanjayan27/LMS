# 🎓 StudPlat – Learning Management System (LMS)

StudPlat is a full-stack Learning Management System built for modern educators and learners. This platform allows users to explore, enroll, rate, and review courses, while educators can publish courses and manage their teaching dashboard.

## 🚀 Live Demo

🌐 https://studplat.vercel.app

## 📌 Features

    ### 👩‍🎓 For Learners:
    - 🔍 Browse all available courses
    - ✅ Enroll in any course (free or paid)
    - ⭐ Rate and review courses
    - 📜 View course details, duration, and content
    - ⏱️ Track enrolled courses via user dashboard
    
    ### 🧑‍🏫 For Educators:
    - ➕ Add new courses (title, description, price, thumbnail, etc.)
    - 📊 Access educator dashboard with analytics
    - ✏️ Manage published courses
    - 🧾 View enrolled students per course
    
    ### 🛡️ Authentication:
    - 🔐 Secure login/signup using **Clerk Auth**
    - 🧾 User roles: **Educator** & **Learner**
    - 🧾 Protected routes & role-based access
    
    ### 💳 Payments (If enabled):
    - 💸 Stripe integration for paid course enrollments (test card: `4242 4242 4242 4242`)
    
---

## 🛠️ Tech Stack

| Frontend       | Backend        | Database   | Others                |
|----------------|----------------|------------|------------------------|
| React.js       | Node.js        | MongoDB    | Tailwind CSS          |
| Redux Toolkit  | Express.js     | Mongoose   | Stripe (test payments)|
| Clerk Auth     | RESTful APIs   |            |                        |

---

## 📁 Folder Structure

│
├── client/ # Frontend (React)
│ ├── src/
│ └── ...
│
├── server/ # Backend (Node + Express)
│ ├── controllers/
│ ├── routes/
│ └── ...
│
├── .env
├── README.md
└── package.json

## ⚙️ Getting Started Locally

### 1. Clone the Repo
git clone https://github.com/yourusername/studplat.git
cd studplat
Install Dependencies
For both frontend and backend:
cd client
npm install
cd ../server
npm install

 ## Add .env files
Create .env in /server for backend environment variables:
MONGO_URI=your_mongo_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
CLERK_SECRET_KEY=your_clerk_secret_key

## Run the App

Start backend:
cd server
npm run dev

Start frontend:
cd client
npm start
