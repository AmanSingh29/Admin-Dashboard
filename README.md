# MERN Stack Role-Based Admin Dashboard

A full-stack admin dashboard built using the MERN stack with role-based authentication and authorization.

## 🌐 Live URL

https://admin-dashboard-five-tau-80.vercel.app

## 📁 Project Structure

This project has two main folders:

- `be`: Backend (Node.js + Express + MongoDB)
- `fe`: Frontend (Next.js + Tailwind CSS + TypeScript)

---

## ⚙️ Backend Setup (`be`)

1. Navigate to the backend folder:

```bash
cd be
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file inside the `be` folder and add the following keys:

```env
MONGODB_URI=
PORT=
ENV=
JWT_SECRET=
JWT_EXPIRES_IN=
```

4. Start the backend server:

```bash
npm run dev
```

This will run the backend at: `http://localhost:5000`

---

## 💻 Frontend Setup (`fe`)

1. Navigate to the frontend folder:

```bash
cd fe
```

2. Install dependencies:

```bash
npm install
```

3. Configure API endpoint in `utils/fetch.ut.ts`:

```ts
const BASE_URL = "http://localhost:5000"; // if don't work then enter the forwarded public port from the BE or your deployed backend URL
```

4. Start the frontend development server:

```bash
npm run dev
```

The frontend will run at: `http://localhost:3000`

---

## 🚀 Features

- ✅ User Signup / Login with JWT Auth
- 👤 Role-based Access: Admin, Editor, Viewer
- 🔐 Protected Routes (Client + Server)
- 🧑‍💼 Admin: Manage users and edit roles
- ✍️ Editor: Create, Edit, and Delete posts
- 🛠️ Clean Code and Folder Structure
- 💅 Responsive UI (Tailwind CSS)
- 🛎️ Toast Notifications for success and error
- 🌐 Deployed on Vercel

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas)
- **Authentication:** JWT
- **Icons:** Lucide React

---

## 📌 Notes

- The backend must be running for the frontend to work correctly.
- Always keep environment variables secure and **never** expose sensitive data.
- Make sure the `BASE_URL` in frontend is set correctly before deployment.

