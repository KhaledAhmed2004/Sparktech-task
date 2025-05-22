# Course Learning App (LMS Backend)

A robust and scalable Learning Management System (LMS) backend built with **Node.js**, **Express**, **MongoDB**, and **TypeScript**. This API connects students and teachers through structured courses, lessons, topics, quizzes, and performance tracking — designed to power interactive and engaging online education platforms.

---

## 🚀 Features

### 👥 Authentication & User Roles

* Secure user registration and login with JWT authentication
* Role-based access control for Students and Teachers

### 🎯 Teacher Capabilities

* Create, update, and soft-delete **Courses**, **Lessons**, and **Topics**
* Add and manage **Quizzes** under topics
* View course analytics such as student engagement, likes, and feedback
* Track student performance and quiz results in real-time

### 📚 Student Capabilities

* Enroll in courses and follow favorite teachers
* Like and provide feedback on courses
* Access lessons and topics with progress tracking
* Attempt quizzes and review quiz results

---

## 🧰 Tech Stack

| Layer          | Technology            |
| -------------- | --------------------- |
| Backend        | Node.js, Express      |
| Language       | TypeScript            |
| Database       | MongoDB, Mongoose     |
| Authentication | JWT                   |
| Validation     | Zod                   |
| Error Handling | Custom global handler |

---

# 📘 API Structure (Grouped by Role)

**Base API URL:** `https://sparktech-task.vercel.app/api/v1`

---

### 🔐 **Auth & User Routes**

#### Auth Routes

| Method | Path          | Description |
| ------ | ------------- | ----------- |
| POST   | `/auth/login` | User login  |

#### User Routes

| Method | Path                    | Description          |
| ------ | ----------------------- | -------------------- |
| POST   | `/users/create-student` | Create a new student |
| POST   | `/users/create-teacher` | Create a new teacher |

---

### 👩‍🏫 **Teacher Routes**

#### Courses

| Method | Path                      | Description            |
| ------ | ------------------------- | ---------------------- |
| POST   | `/course/create`          | Create new course      |
| PATCH  | `/course/:courseId`       | Update course          |
| DELETE | `/course/:courseId`       | Soft-delete course     |
| GET    | `/course/:courseId`       | Get single course      |
| GET    | `/course/performance/:id` | Get course performance |

#### Lessons

| Method | Path                        | Description           |
| ------ | --------------------------- | --------------------- |
| POST   | `/lessons/create/:courseId` | Create lesson         |
| PUT    | `/lessons/:lessonId`        | Update lesson         |
| DELETE | `/lessons/:lessonId`        | Delete lesson         |
| GET    | `/lessons/course/:courseId` | Get lessons by course |
| GET    | `/lessons/:lessonId`        | Get single lesson     |

#### Topics

| Method | Path                       | Description          |
| ------ | -------------------------- | -------------------- |
| POST   | `/topics/create/:lessonId` | Create topic         |
| PATCH  | `/topics/:id`              | Update topic         |
| DELETE | `/topics/:id`              | Delete topic         |
| GET    | `/topics/lesson/:lessonId` | Get topics by lesson |
| GET    | `/topics/:id`              | Get single topic     |

#### Quizzes

| Method | Path                       | Description             |
| ------ | -------------------------- | ----------------------- |
| POST   | `/quizzes/create/:topicId` | Create quiz under topic |
| PATCH  | `/quizzes/:id`             | Update quiz             |
| DELETE | `/quizzes/:id`             | Delete quiz             |
| GET    | `/quizzes/:id`             | Get single quiz         |
| GET    | `/quizzes/by-topic/:id`    | Get quizzes for a topic |

---

### 🎓 **Student Routes**

#### Course Enrollment & Feedback

| Method | Path                            | Description           |
| ------ | ------------------------------- | --------------------- |
| POST   | `/course/enroll/:courseId`      | Enroll in a course    |
| GET    | `/course`                       | Get all courses       |
| GET    | `/course/enrolled-students/:id` | Get enrolled students |

#### Like & Unlike

| Method | Path                | Description     |
| ------ | ------------------- | --------------- |
| POST   | `/like/:courseId`   | Like a course   |
| POST   | `/unlike/:courseId` | Unlike a course |

#### Feedback

| Method | Path                   | Description               |
| ------ | ---------------------- | ------------------------- |
| GET    | `/feedback/course/:id` | Get feedback by course    |
| POST   | `/feedback/course/:id` | Submit feedback (student) |

#### Student Profile Actions

| Method | Path                         | Description              |
| ------ | ---------------------------- | ------------------------ |
| PATCH  | `/student/enroll/:id`        | Enroll course (internal) |
| POST   | `/student/follow/:teacherId` | Follow teacher           |

#### Quiz Actions

| Method | Path                        | Description              |
| ------ | --------------------------- | ------------------------ |
| GET    | `/quizzes/student-view/:id` | Get quiz without answers |
| POST   | `/quizzes/submit/:quizId`   | Submit quiz answers      |

---

