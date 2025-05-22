// import { Types } from "mongoose";
// import { Student } from "../student/student.model";
// import { ICourse } from "./course.interface";
// import { Course } from "./course.model";
// import QueryBuilder from "../../builder/QueryBuilder";

// // Service to create a course document in DB
// const createCourseIntoDB = async (
//   payload: Partial<ICourse>,
//   teacherId: string
// ) => {
//   // Merge teacherId into the course payload
//   const coursePayload = {
//     ...payload,
//     teacher: teacherId,
//   };

//   const result = await Course.create(coursePayload);
//   return result;
// };

// // Service to get all courses (excluding soft-deleted ones)
// const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
//   const courseQuery = Course.find({ isDeleted: false }); // Only show non-deleted courses

//   const queryBuilder = new QueryBuilder(courseQuery, query)
//     .search(["title", "description"])
//     .filter()
//     .sort()
//     .fields()
//     .paginate();

//   const courses = await queryBuilder.modelQuery;

//   return {
//     data: courses,
//   };
// };

// // Service to update a course by ID in DB
// const updateCourseIntoDB = async (id: string, payload: Partial<ICourse>) => {
//   const result = await Course.findByIdAndUpdate({ _id: id }, payload, {
//     new: true, // Return updated document
//   });
//   return result;
// };

// // Service to soft-delete a course by setting isDeleted to true
// const deleteCourseFromDB = async (id: string) => {
//   const result = await Course.findByIdAndUpdate(
//     id,
//     { isDeleted: true },
//     { new: true }
//   );
//   return result;
// };

// // Service to enroll a student in a course
// const enrollCourse = async (id: string, studentId: string) => {
//   // Convert IDs to ObjectId instances
//   const courseObjectId = new Types.ObjectId(id);
//   const studentObjectId = new Types.ObjectId(studentId);

//   // Add the course ID to the student's enrolledCourses array without duplicates
//   // Upsert creates the document if it doesn't exist
//   const updatedStudent = await Student.findOneAndUpdate(
//     { userId: studentObjectId }, // Filter by student's userId field
//     { $addToSet: { enrolledCourses: courseObjectId } }, // Add course to enrolledCourses if not already present
//     {
//       new: true, // Return updated student document
//       upsert: true, // Create student if doesn't exist
//       setDefaultsOnInsert: true, // Apply defaults if created
//     }
//   );

//   return updatedStudent;
// };

// // Service to get a single course and update view count if user has not viewed before
// const getSingleCourseFromDB = async (id: string, userId: string) => {

//    const course = await Course.findById(id).populate("lessons");

//   if (!course) return null;

//   // Check if user has already viewed the course
//   const hasUserViewed = course.viewedUsers?.some(
//     (viewerId) => viewerId.toString() === userId
//   );

//   if (!hasUserViewed) {
//     course.views += 1; // Increment view count
//     course.viewedUsers.push(new Types.ObjectId(userId)); // Track user view
//     await course.save(); // Save changes
//   }

//   return course;
// };

// export const CourseServices = {
//   createCourseIntoDB,
//   updateCourseIntoDB,
//   deleteCourseFromDB,
//   enrollCourse,
//   getSingleCourseFromDB,
//   getAllCoursesFromDB,
// };
import { Types } from "mongoose";
import { Student } from "../student/student.model";
import { ICourse } from "./course.interface";
import { Course } from "./course.model";
import QueryBuilder from "../../builder/QueryBuilder";

// Create a course (teacher assigned)
const createCourseIntoDB = async (
  payload: Partial<ICourse>,
  teacherId: string
) => {
  const coursePayload = {
    ...payload,
    teacher: teacherId,
  };

  const result = await Course.create(coursePayload);
  return result;
};

// Get all courses excluding soft deleted ones
const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = Course.find({ isDeleted: false }); // exclude soft deleted courses

  const queryBuilder = new QueryBuilder(courseQuery, query)
    .search(["title", "description"])
    .filter()
    .sort()
    .fields()
    .paginate();

  const courses = await queryBuilder.modelQuery;

  return {
    data: courses,
  };
};

// Update a course (should not update if course is deleted)
const updateCourseIntoDB = async (id: string, payload: Partial<ICourse>) => {
  // Optionally prevent update if course is soft deleted
  const course = await Course.findOne({ _id: id, isDeleted: false });
  if (!course) throw new Error("Course not found or deleted");

  const result = await Course.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

// Soft delete a course by setting isDeleted to true
const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

// Enroll student to a course (ensure course not soft deleted)
const enrollCourse = async (id: string, studentId: string) => {
  // Verify course exists and not deleted
  const course = await Course.findOne({ _id: id, isDeleted: false });
  if (!course) throw new Error("Course not found or deleted");

  const courseObjectId = new Types.ObjectId(id);
  const studentObjectId = new Types.ObjectId(studentId);

  const updatedStudent = await Student.findOneAndUpdate(
    { userId: studentObjectId },
    { $addToSet: { enrolledCourses: courseObjectId } },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    }
  );

  return updatedStudent;
};

// Get single course by id, exclude soft deleted courses and soft deleted lessons, update views
const getSingleCourseFromDB = async (id: string, userId: string) => {
  // Find course only if not deleted
  const course = await Course.findOne({ _id: id, isDeleted: false }).populate({
    path: "lessons",
    match: { isDeleted: false }, // only populate lessons not soft deleted
  });

  if (!course) return null;

  const hasUserViewed = course.viewedUsers?.some(
    (viewerId) => viewerId.toString() === userId
  );

  if (!hasUserViewed) {
    course.views += 1;
    course.viewedUsers.push(new Types.ObjectId(userId));
    await course.save();
  }

  return course;
};
// Get performance info only
const getCoursePerformanceFromDB = async (courseId: string) => {
  const course = await Course.findOne(
    { _id: courseId, isDeleted: false },
    { likeCount: 1, views: 1, totalFeedback: 1 }
  );

  return course;
};
const getEnrolledStudentsFromDB = async (courseId: string) => {
  const students = await Student.find({ enrolledCourses: courseId }).populate(
    "userId",
    "name email"
  );
   // Now, map the result to the desired structure
  const formattedStudents = students.map((student: any) => ({
    _id: student.userId._id, // Use the _id from the populated user
    name: student.userId.name,
    email: student.userId.email,
  }));

  return formattedStudents;
};
export const CourseServices = {
  createCourseIntoDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  enrollCourse,
  getSingleCourseFromDB,
  getAllCoursesFromDB,
  getCoursePerformanceFromDB,
  getEnrolledStudentsFromDB,
};
