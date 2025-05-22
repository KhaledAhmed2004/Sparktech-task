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



## 📦 Postman Collection

You can use the provided Postman collection to test all the available APIs.

🔗 **[⬇️ Download Postman Collection](https://drive.google.com/uc?export=download&id=1_Ld3avm3WkRq0OfqYe6KuM2jybcGQH9q)**

---

✅ **Tip:**
Import the collection into your Postman workspace and use the environment variables provided to simplify authentication and testing.

> ⚠️ **Important Warning**
> After logging in, make sure to **copy the access token** and set it in the appropriate environment variable:
>
> * For **Students**, set it to `studentToken`
> * For **Teachers**, set it to `teacherToken`

**✅ DON’T FORGET TO SAVE THE CHANGES AFTER PASTING THE TOKEN!**

---

💡 **Note:**
If any route gives you an issue, kindly **double-check both the README and the Postman collection** to ensure you’re using the correct endpoint, method, and required data.



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
| POST   | `/courses/create`          | Create new course      |
| PATCH  | `/courses/:courseId`       | Update course          |
| DELETE | `/courses/:courseId`       | Soft-delete course     |
| GET    | `/courses/:courseId`       | Get single course      |
| GET    | `/courses/enrolled-students/:courseId` | Get enrolled students |

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

#### Analytics

| Method | Path                       | Description             |
| ------ | -------------------------- | ----------------------- |
| GET    | `/courses/performance/:id`  | Get course performance  |

---

### 🎓 **Student Routes**

#### Course Enrollment & Feedback

| Method | Path                            | Description           |
| ------ | ------------------------------- | --------------------- |
| POST   | `/courses/enroll/:courseId`      | Enroll in a course    |
| GET    | `/courses`                       | Get all courses       |
| GET    | `/courses/:coursesId`                       | Get courses ditels       |

#### Like & Unlike

| Method | Path                | Description     |
| ------ | ------------------- | --------------- |
| POST   | `/likes/like/:courseId`   | Like a course   |
| POST   | `/likes/unlike/:courseId` | Unlike a course |

#### Feedback

| Method | Path                   | Description               |
| ------ | ---------------------- | ------------------------- |
| GET    | `/feedback/course/:id` | Get feedback by course    |
| POST   | `/feedback/course/:id` | Submit feedback (student) |

#### Student Profile Actions

| Method | Path                         | Description              |
| ------ | ---------------------------- | ------------------------ |
| POST   | `/students/follow/:teacherId` | Follow teacher           |

#### Quiz Actions

| Method | Path                        | Description              |
| ------ | --------------------------- | ------------------------ |
| GET    | `/quizzes/student-view/:id` | Get quiz without answers |
| POST   | `/quizzes/submit/:quizId`   | Submit quiz answers      |

---























































