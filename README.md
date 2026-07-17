<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:4F46E5,50:7C3AED,100:EC4899&height=220&section=header&text=Daily%20Task%20To-Do%20Planner%20API&fontSize=38&fontColor=ffffff&animation=twinkling&fontAlignY=38"/>
</p>

> A production-ready **Task Management REST API** built with **Node.js, Express.js, MySQL, Sequelize ORM, JWT Authentication, Nodemailer, and bcrypt**. The application enables secure user authentication, email verification, task organization, reminders, reports, and productivity insights while following a scalable MVC architecture.

<p align="center">
  <img src="https://skillicons.dev/icons?i=nodejs,express,mysql,sequelize,javascript,vscode,git,github,postman" />
</p>

---

# 📌 Project Overview

The **Daily Task To-Do Planner API** is a production-ready backend application designed to help users efficiently organize and manage their daily activities.

The system allows users to securely create an account, verify their email address, manage tasks with priorities, categories, labels, and reminders, while also providing detailed reports and productivity insights.

The application follows a clean **MVC Architecture** and demonstrates best practices for building scalable REST APIs using **Node.js, Express.js, Sequelize ORM, and MySQL**.

---

# 🎯 Project Objective

The objective of this project is to build a secure and scalable task management system where users can:

- Register using email verification
- Login securely using JWT Authentication
- Manage daily tasks
- Organize tasks using categories and labels
- Set reminders
- Track task completion
- Generate productivity reports
- Receive task summary emails
- Maintain relational data using Sequelize ORM

---

# 🚀 Business Scenario

Imagine a productivity application similar to **Microsoft To Do, Google Tasks, Todoist, TickTick, or Notion** where users manage their daily work and personal activities.

The application helps users organize their schedules by allowing them to:

- Create tasks
- Set priorities
- Categorize tasks
- Add labels
- Set reminders
- Monitor productivity
- Track completed tasks
- Receive task summaries

This project demonstrates how modern productivity applications manage task planning and reporting using REST APIs.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- Email Verification
- Secure Login
- JWT Authentication
- Refresh Token Authentication
- Password Encryption using bcrypt
- Protected APIs

---

## 👤 User Management

Users can

- Register Account
- Verify Email
- Login
- View Profile
- Update Profile
- Upload Profile Picture

---

## ✅ Task Management

Users can

- Create Tasks
- Update Tasks
- Delete Tasks
- Mark Tasks as Completed
- Reorder Tasks
- View All Tasks
- Filter Tasks
- Search Tasks

Task filters include

- Today
- Tomorrow
- This Week
- Pending
- Completed
- Category
- Labels

---

## 🏷 Category Management

Users can

- Create Categories
- Update Categories
- Delete Categories
- View Categories

Examples

- Work
- Personal
- Study
- Fitness
- Shopping

---

## 🏷 Label Management

Users can

- Create Labels
- Assign Labels to Tasks
- Remove Labels
- View Labels

Examples

- Urgent
- Meeting
- Assignment
- Project
- Important

---

## ⏰ Reminder Management

Users can

- Set Task Reminder
- Update Reminder
- Delete Reminder

Reminder Types

- Specific Time Reminder
- Daily Reminder
- Weekly Reminder

---

## 📊 Reports & Insights

Generate detailed reports including

- Daily Task Summary
- Weekly Task Summary
- Completed Tasks
- Pending Tasks
- Overdue Tasks
- Upcoming Tasks
- Task Completion Percentage
- Average Completion Time

---

## 📧 Email Features

- Email Verification
- Daily Task Summary Email
- Weekly Task Summary Email

---

# 🛡 Security Features

- JWT Authentication
- Refresh Token Authentication
- Email Verification
- Password Hashing using bcrypt
- Request Validation using Joi
- Protected Routes
- Centralized Error Handling
- Environment Variables
- Sequelize ORM Security
- SQL Injection Protection

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js

## Database

- MySQL
- Sequelize ORM

## Authentication

- JWT
- bcrypt

## Email Service

- Nodemailer

## Validation

- Joi

## Logging

- Winston Logger

## API Testing

- Postman

## Architecture

- MVC Pattern

---

# 📦 NPM Packages

- express
- sequelize
- mysql2
- jsonwebtoken
- bcrypt
- joi
- dotenv
- nodemailer
- multer
- cloudinary
- cookie-parser
- cors
- helmet
- morgan
- winston
- uuid

---

# ✨ Key Highlights

- Secure Authentication System
- Email Verification Workflow
- Complete Task CRUD
- Category & Label Management
- Reminder Management
- Advanced Task Filtering
- Task Reordering
- Productivity Reports
- Email Notifications
- RESTful API Design
- MVC Architecture
- Sequelize Associations
- Production-Level Folder Structure
- Clean & Scalable Code

# 📂 Project Structure

```text
src
│
├── config
│   ├── dbCon.js
│   ├── cloudinary.js
│   └── emailVerify.js
│
├── controller
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── task.controller.js
│   ├── category.controller.js
│   ├── label.controller.js
│   ├── reminder.controller.js
│   └── report.controller.js
│
├── middleware
│   ├── auth.js
│   ├── fileUploades.js
│   └── errorHandler.js
│
├── model
│   ├── userModel.js
│   ├── taskModel.js
│   ├── categoryModel.js
│   ├── labelModel.js
│   ├── reminderModel.js
│   ├── verificationModel.js
│   └── index.js
│
├── routes
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── task.routes.js
│   ├── category.routes.js
│   ├── reminder.routes.js
│   ├── report.routes.js
│   └── index.js
│
├── validation
│   ├── authValidation.js
│   ├── taskValidation.js
│   ├── categoryValidation.js
│   └── reminderValidation.js
│
├── utils
│   ├── logger.js
│   ├── sendEmail.js
│   ├── sendTaskSummaryEmail.js
│   └── httpStatusCode.js
│
└── server.js

public/
upload/

package.json
```

---

# 🗄 Database Design

## 👤 Users

```javascript
{
    id,
    name,
    email,
    password,
    image,
    refreshToken,
    isVerified,
    createdAt,
    updatedAt
}
```

---

## ✅ Tasks

```javascript
{
    id,
    userId,
    title,
    description,
    priority,
    status,
    dueDate,
    completedAt,
    categoryId,
    order,
    createdAt,
    updatedAt
}
```

---

## 🏷 Categories

```javascript
{
    id,
    userId,
    name,
    description
}
```

---

## 🏷 Labels

```javascript
{
    id,
    userId,
    name
}
```

---

## 🔔 Reminders

```javascript
{
    id,
    taskId,
    reminderType,
    reminderTime,
    isActive
}
```

---

## 📧 Email Verification

```javascript
{
    id,
    userId,
    token,
    createdAt
}
```

---

# 🔗 Database Relationships

```text
                     Users
                       │
          ┌────────────┼────────────┐
          │            │            │
          │            │            │
          ▼            ▼            ▼
      Categories     Tasks        Labels
          │            │             ▲
          │            │             │
          │            └──────┐      │
          │                   │      │
          ▼                   ▼      │
      One-to-Many        Reminders   │
                               ▲     │
                               │     │
                         Many-to-Many
                               │
                               ▼
                          TaskLabels
```

---

# 🔄 Sequelize Associations

```javascript
User.hasMany(Task);
Task.belongsTo(User);

User.hasMany(Category);
Category.belongsTo(User);

User.hasMany(Label);
Label.belongsTo(User);

Category.hasMany(Task);
Task.belongsTo(Category);

Task.belongsToMany(Label,{
    through:"TaskLabels"
});

Label.belongsToMany(Task,{
    through:"TaskLabels"
});

Task.hasMany(Reminder);
Reminder.belongsTo(Task);

User.hasOne(EmailVerification);
EmailVerification.belongsTo(User);
```

---

# 🌐 API Modules

## 🔐 Authentication APIs

- User Signup
- Email Verification
- User Login
- Refresh Token

---

## 👤 User APIs

- Get Profile
- Update Profile

---

## ✅ Task APIs

- Add Task
- Update Task
- Delete Task
- Mark Task Completed
- List Tasks
- Reorder Tasks

---

## 🏷 Category APIs

- Add Category
- Update Category
- Delete Category
- List Categories

---

## 🏷 Label APIs

- Add Label
- List Labels

---

## 🔔 Reminder APIs

- Set Reminder
- Update Reminder
- Delete Reminder

---

## 📊 Reports APIs

- Daily Task Summary
- Weekly Task Summary
- Task Statistics
- Email Task Summary

---

# 🔄 Request Flow

```text
Client

   │

   ▼

Routes

   │

   ▼

Authentication Middleware

   │

   ▼

Validation

   │

   ▼

Controller

   │

   ▼

Business Logic

   │

   ▼

Sequelize ORM

   │

   ▼

MySQL Database

   │

   ▼

JSON Response
```

---

# 📌 Entity Relationship Diagram (ERD)

```text
+-----------+
|   Users   |
+-----------+
| id        |
| name      |
| email     |
| password  |
+-----------+
      │
      │1
      │
      │N
+-----------+
|   Tasks   |
+-----------+
| id        |
| title     |
| priority  |
| status    |
| dueDate   |
| categoryId|
+-----------+
      │
      │N
      │
      │1
+-------------+
| Categories  |
+-------------+

Tasks
   │
   │ N
   │
   │ M
Labels

Tasks
   │
   │1
   │
   │N
Reminders
```

---

# 📑 Core Modules

| Module | Description |
|---------|-------------|
| Authentication | User Registration, Login & Email Verification |
| User | Profile Management |
| Task | Complete Task CRUD Operations |
| Category | Group Tasks into Categories |
| Label | Tag Tasks with Custom Labels |
| Reminder | Create Task Notifications |
| Reports | Task Summary & Productivity Insights |
| Email | Verification & Task Summary Emails |

---

# ⚡ API Highlights

- RESTful API Design
- JWT Protected Routes
- Refresh Token Authentication
- Email Verification Workflow
- Advanced Task Filtering
- Many-to-Many Relationship (Tasks ↔ Labels)
- One-to-Many Relationship (Users ↔ Tasks)
- Aggregate Reports using Sequelize
- Task Completion Analytics
- Daily & Weekly Summary Reports
- Clean MVC Architecture
- Production-Level Code Structure

# 🔒 Security Features

The application follows industry-standard security practices to ensure secure authentication, authorization, and data protection.

- JWT Authentication
- Refresh Token Authentication
- Email Verification
- Password Hashing using bcrypt
- Request Validation using Joi
- Protected Routes
- Environment Variables using dotenv
- SQL Injection Protection through Sequelize ORM
- Centralized Error Handling
- Secure Password Storage
- Token-Based Authentication
- Authentication Middleware
- Input Validation
- Secure REST APIs

---

# 📊 Reports & Insights

The application provides productivity insights to help users monitor and improve their task management.

## 📅 Task Summary

Generate task summaries for:

- Daily Tasks
- Weekly Tasks

The summary includes:

- Total Tasks
- Completed Tasks
- Pending Tasks

---

## 📈 Task Statistics

Generate detailed statistics including:

- Task Completion Percentage
- Average Completion Time
- Productivity Insights

---

## 📧 Email Reports

Automatically send task summaries to users via email.

The email contains:

- Overdue Tasks
- Upcoming Tasks
- Completed Tasks

---

# ⚡ API Highlights

- RESTful API Design
- JWT Authentication
- Refresh Token Authentication
- Email Verification Workflow
- Profile Management
- Task CRUD Operations
- Category Management
- Label Management
- Reminder Management
- Task Filtering
- Task Reordering
- Daily & Weekly Reports
- Task Statistics
- Email Notifications
- Many-to-Many Relationships
- MVC Architecture
- Production-Level Folder Structure

---

# 📈 Skills Demonstrated

This project demonstrates practical backend development skills including:

- Node.js
- Express.js
- Sequelize ORM
- MySQL
- REST API Development
- JWT Authentication
- Refresh Token Authentication
- Email Verification
- Nodemailer
- bcrypt
- Joi Validation
- CRUD Operations
- Sequelize Associations
- MVC Architecture
- Middleware Development
- File Upload
- Cloudinary Integration
- Error Handling
- Logging using Winston
- API Testing using Postman

---

# 🎓 Learning Outcomes

Building this project helped me understand:

- Authentication & Authorization
- Email Verification Workflow
- Refresh Token Authentication
- Sequelize ORM Associations
- MySQL Database Design
- REST API Development
- MVC Architecture
- Middleware Development
- Secure Password Hashing
- Request Validation
- Task Management System Design
- Reminder System Development
- Database Relationships
- Aggregate Queries using Sequelize
- Production-Level Backend Development

---

# 🚀 Future Improvements

Future enhancements planned for this project include:

- Password Reset Functionality
- Social Login (Google & GitHub)
- Push Notifications
- Real-Time Notifications using Socket.IO
- Calendar Integration
- Drag & Drop Task Management
- Recurring Tasks
- Task Attachments
- Team Collaboration
- Shared Task Lists
- Dashboard Analytics
- Pagination
- Search Functionality
- Docker Deployment
- CI/CD Integration
- Swagger API Documentation
- Unit Testing
- Deployment on AWS or Render

---

# ▶ Installation

Clone the repository

```bash
git clone https://github.com/your-username/daily-task-planner-api.git
```

Move into the project directory

```bash
cd daily-task-planner-api
```

Install dependencies

```bash
npm install
```

---

# ⚙ Environment Variables

Create a `.env` file in the root directory.

```env
PORT=4035

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=daily_task_planner

JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

# ▶ Run the Server

Development Mode

```bash
npm run dev
```

Production Mode

```bash
npm start
```

---

# 📮 API Testing

You can test all APIs using:

- Postman
- Thunder Client
- Insomnia

---

# 💼 Skills for Resume

This project demonstrates practical experience with:

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JWT Authentication
- Refresh Token Authentication
- Email Verification
- Nodemailer
- bcrypt
- Joi Validation
- REST APIs
- MVC Architecture
- Sequelize Associations
- CRUD Operations
- Middleware Development
- Secure Backend Development

---

# 🤝 Contributing

Contributions are welcome!

If you'd like to improve this project:

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push your branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 👨‍💻 Author

## **Raktim Bhattacharya**

**Backend Developer**

### 💻 Tech Stack

Node.js • Express.js • MySQL • Sequelize ORM • REST APIs • JWT Authentication

### 📫 Connect with Me

- GitHub: https://github.com/your-github-username
- LinkedIn: https://linkedin.com/in/your-linkedin-profile
- Email: your-email@example.com

---

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:4F46E5,50:7C3AED,100:EC4899&height=120&section=footer"/>
</p>

---

# ⭐ Support

If you found this project helpful, please consider giving it a ⭐ **Star** on GitHub.

It helps others discover the project and motivates me to continue building more production-ready backend applications.

---

<p align="center">
  <b>Made with ❤️ by Raktim Bhattacharya</b>
</p>
