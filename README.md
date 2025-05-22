
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

| Layer             | Technology                     |
| ----------------- | ------------------------------ |
| Backend           | Node.js, Express               |
| Language          | TypeScript                     |
| Database          | MongoDB, Mongoose              |
| Authentication    | JWT                            |
| Validation        | Zod                            |
| Error Handling    | Custom global handler          |

---

# Api list

## 📘 Course Endpoints

| Method | Full URL                                                                                                                                | Description                                 | Access            |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ----------------- |
| POST   | [https://sparktech-task.vercel.app/api/v1/courses/create](https://sparktech-task.vercel.app/api/v1/courses/create)                      | Create a new course                         | Teacher only      |
| PATCH  | [https://sparktech-task.vercel.app/api/v1/courses/\:courseId](https://sparktech-task.vercel.app/api/v1/courses/:courseId)               | Update an existing course (partial)         | Teacher only      |
| GET    | [https://sparktech-task.vercel.app/api/v1/courses/\:courseId](https://sparktech-task.vercel.app/api/v1/courses/:courseId)               | Get course details                          | Teacher & Student |
| POST   | [https://sparktech-task.vercel.app/api/v1/courses/enroll/\:courseId](https://sparktech-task.vercel.app/api/v1/courses/enroll/:courseId) | Enroll in a course                          | Student only      |
| DELETE | [https://sparktech-task.vercel.app/api/v1/courses/\:courseId](https://sparktech-task.vercel.app/api/v1/courses/:courseId)               | Soft-delete a course                        | Teacher only      |
| GET    | [https://sparktech-task.vercel.app/api/v1/courses](https://sparktech-task.vercel.app/api/v1/courses)                                    | Get all courses (with pagination/filtering) | Public (any user) |

---

## 🎓 Lesson Endpoints

| Method | Full URL                                                                                                                                | Description                                      | Access       |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------------ |
| POST   | [https://sparktech-task.vercel.app/api/v1/lessons/create/\:courseId](https://sparktech-task.vercel.app/api/v1/lessons/create/:courseId) | Create a new lesson attached to a course         | Teacher only |
| GET    | [https://sparktech-task.vercel.app/api/v1/lessons/course/\:courseId](https://sparktech-task.vercel.app/api/v1/lessons/course/:courseId) | Get all non-deleted lessons of a specific course | Public       |
| GET    | [https://sparktech-task.vercel.app/api/v1/lessons/\:lessonId](https://sparktech-task.vercel.app/api/v1/lessons/:lessonId)               | Get a single lesson by ID                        | Public       |
| PUT    | [https://sparktech-task.vercel.app/api/v1/lessons/\:lessonId](https://sparktech-task.vercel.app/api/v1/lessons/:lessonId)               | Update a lesson's details                        | Teacher only |
| DELETE | [https://sparktech-task.vercel.app/api/v1/lessons/\:lessonId](https://sparktech-task.vercel.app/api/v1/lessons/:lessonId)               | Soft-delete a lesson and remove from course      | Teacher only |

---

## 📘 Topic Endpoints

| Method | Full URL                                                                                                                              | Description                                     | Access            |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ----------------- |
| POST   | [https://sparktech-task.vercel.app/api/v1/topics/create/\:lessonId](https://sparktech-task.vercel.app/api/v1/topics/create/:lessonId) | Create a new topic under a specific lesson      | Teacher only      |
| GET    | [https://sparktech-task.vercel.app/api/v1/topics/lesson/\:lessonId](https://sparktech-task.vercel.app/api/v1/topics/lesson/:lessonId) | Get all topics under a specific lesson          | Teacher & Student |
| GET    | [https://sparktech-task.vercel.app/api/v1/topics/\:id](https://sparktech-task.vercel.app/api/v1/topics/:id)                           | Get a single topic by ID                        | Teacher & Student |
| PATCH  | [https://sparktech-task.vercel.app/api/v1/topics/\:id](https://sparktech-task.vercel.app/api/v1/topics/:id)                           | Update a topic                                  | Teacher only      |
| DELETE | [https://sparktech-task.vercel.app/api/v1/topics/\:id](https://sparktech-task.vercel.app/api/v1/topics/:id)                           | Soft-delete a topic (mark as `isDeleted: true`) | Teacher only      |

---

## 📘 Course Performance Tracking Endpoint

| Method | Full URL                                                                                                                                          | Description                                                       | Access                            |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | --------------------------------- |
| GET    | [https://sparktech-task.vercel.app/api/v1/courses/\:courseId/performance](https://sparktech-task.vercel.app/api/v1/courses/:courseId/performance) | Get performance stats for a course (likes, views, feedback count) | Student & Teacher (Authenticated) |

---

## 🧠 Quiz API Documentation

| Method | Full URL                                                                                                                                                     | Description                                     | Access                      |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- | --------------------------- |
| POST   | [https://sparktech-task.vercel.app/api/v1/quizzes](https://sparktech-task.vercel.app/api/v1/quizzes)                                                         | Create a new quiz                               | Public/Admin? (unspecified) |
| GET    | [https://sparktech-task.vercel.app/api/v1/quizzes](https://sparktech-task.vercel.app/api/v1/quizzes)                                                         | Retrieve all quizzes                            | Public                      |
| GET    | [https://sparktech-task.vercel.app/api/v1/quizzes/topic/\:topicId](https://sparktech-task.vercel.app/api/v1/quizzes/topic/:topicId)                          | Get all quizzes by topic ID                     | Public                      |
| GET    | [https://sparktech-task.vercel.app/api/v1/quizzes/\:id](https://sparktech-task.vercel.app/api/v1/quizzes/:id)                                                | Get a quiz by its ID                            | Public                      |
| PATCH  | [https://sparktech-task.vercel.app/api/v1/quizzes/\:id](https://sparktech-task.vercel.app/api/v1/quizzes/:id)                                                | Update a quiz by ID                             | Admin? (unspecified)        |
| DELETE | [https://sparktech-task.vercel.app/api/v1/quizzes/\:id](https://sparktech-task.vercel.app/api/v1/quizzes/:id)                                                | Delete a quiz by ID                             | Admin? (unspecified)        |
| POST   | [https://sparktech-task.vercel.app/api/v1/quizzes/submit](https://sparktech-task.vercel.app/api/v1/quizzes/submit)                                           | Submit a quiz attempt by a student              | Student/User                |
| GET    | [https://sparktech-task.vercel.app/api/v1/quizzes/\:id/for-student/\:studentId](https://sparktech-task.vercel.app/api/v1/quizzes/:id/for-student/:studentId) | Get a quiz for a student (e.g., prevent retake) | Student/User                |

---

## 📘 Like/Unlike Course API Documentation

| Method | Full URL                                                                                                                            | Description                      | Access                       |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ---------------------------- |
| POST   | [https://sparktech-task.vercel.app/api/v1/likes/like/\:courseId](https://sparktech-task.vercel.app/api/v1/likes/like/:courseId)     | Like a specific course           | Auth required (Bearer Token) |
| POST   | [https://sparktech-task.vercel.app/api/v1/likes/unlike/\:courseId](https://sparktech-task.vercel.app/api/v1/likes/unlike/:courseId) | Unlike a previously liked course | Auth required (Bearer Token) |

---

## 📘 Student API Documentation

| Method | Full URL                                                                                                                                      | Description                  | Access             |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------ |
| PATCH  | [https://sparktech-task.vercel.app/api/v1/students/enroll/\:id](https://sparktech-task.vercel.app/api/v1/students/enroll/:id)                 | Enroll a student in a course | Authenticated User |
| POST   | [https://sparktech-task.vercel.app/api/v1/students/follow/\:teacherId](https://sparktech-task.vercel.app/api/v1/students/follow/:teacherId)   | Follow a teacher             | Authenticated User |
| POST   | [https://sparktech-task.vercel.app/api/v1/students/feedback/\:courseId](https://sparktech-task.vercel.app/api/v1/students/feedback/:courseId) | Create feedback for a course | Authenticated User |

