# 📌 Kanban Board App  

A simple **Kanban Board application** built with **React**, **Spring Boot**, and **MySQL**.  
This project was created to **learn and practice Spring Boot** while also integrating it with a modern frontend and a relational database.  

---

## 🚀 Features  

- 📝 Create, edit, and delete tasks  
- 📂 Organize tasks into columns (To Do, In Progress, Done)  
- 🔄 Drag & drop support for moving tasks between columns  
- 📊 Track task progress  
- 🗂️ Project-based task management  
- 💾 Persistent storage with MySQL database  

---

## 🛠️ Tech Stack  

### Frontend  
- **React** (with Hooks & functional components)  
- **Tailwind CSS / CSS Modules** (for styling)  
- **React DnD / @hello-pangea/dnd** (for drag & drop)  

### Backend  
- **Spring Boot** (REST API)  
- **Spring Data JPA** (for database access)  
- **Hibernate** (ORM)  

### Database  
- **MySQL**  

---

## 📂 Project Structure  

  kanban-board/ <br/>
  │── backend/ # Spring Boot backend <br/>
  │ ├── src/main/java # API & business logic <br/>
  │ ├── src/main/resources <br/>
  │ │ └── application.properties # DB config <br/>
  │ <br/>
  │── frontend/ # React frontend <br/>
  │ ├── src/ <br/>
  │ │ ├── components/ # UI components <br/>
  │ │ ├── pages/ # Kanban board pages <br/>
  │ │ └── App.jsx # Main app entry <br/>
  │ <br/>
  └── README.md <br/>
   <br/>
---

## ⚙️ Setup & Installation  

### Prerequisites  
- Node.js & npm  
- Java 17+  
- MySQL  

### Backend Setup  
1. Clone the repo and go to the backend folder:
2. update *username, url & password of your database* in application.properties file
3. ```bash
   cd backend
   mvn spring-boot:run

### Frontend Setup  
1. Clone the repo and go to the frontend folder:
2. ```bash
   cd frontend
   npm install
   npm start

## 🎯 Learning Goals

Understand Spring Boot fundamentals (REST APIs, dependency injection, JPA)

Learn how to connect a React frontend with a Spring Boot backend

Practice CRUD operations with MySQL

Explore project structuring for full-stack apps

##🧑‍💻 Author

👤 Prince Panchal

GitHub: https://github.com/Prince-Panchal007
