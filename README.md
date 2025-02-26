# Todo List Application

A simple full-stack Todo List application built with **React, Node.js, Express, and MongoDB**.

## Features

- 🛡️ User authentication (Register/Login with JWT)
- ✅ Create, update, and delete tasks
- 🎯 Mark tasks as completed
- 💾 Persistent data storage with MongoDB
- 📱 Responsive design

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT

## Installation

### Prerequisites

- Node.js installed
- MongoDB installed and running

### Steps to Run the Project

1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
2. ## Setup Backend

   ```sh
      cd backend
      npm install
      npm run dev
3. ## Setup frontend

   ```sh
      cd todo-app
      npm install
      npm start

## API Routes

### 🔑 Authentication
- **POST** `/api/register` - Register a new user
- **POST** `/api/login` - Login and receive a token

### 📝 Tasks
- **GET** `/api/tasks` - Fetch all tasks (Requires authentication)
- **POST** `/api/tasks` - Add a new task
- **PUT** `/api/tasks/:id` - Update a task
- **DELETE** `/api/tasks/:id` - Delete a task

## Environment Variables

Create a `.env` file in the **backend** directory and add:
      PORT=5000
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret

## Future Enhancements 🚀

- 📆 Add due dates for tasks  
- 🏷️ Implement categories and filters  
- 🎨 Improve UI/UX design  

## License  

This project is open-source and available under the **MIT License**.  

---

Made with ❤️ by **Tushar Pandey**


