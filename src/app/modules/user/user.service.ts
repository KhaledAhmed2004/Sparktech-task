import mongoose from "mongoose";
import { IStudent } from "../student/student.interface";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { Student } from "../student/student.model";
import { ITeacher } from "../teacher/teacher.interface";
import { Teacher } from "../teacher/teacher.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

// Create and register a new student along with user credentials
const createStudentIntoDB = async (payload: IStudent & IUser) => {
  // Check if a user with the same email already exists
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new AppError(httpStatus.CONFLICT, "Email already exists", "email");
  }

  // Prepare user data for creation
  const userData: Partial<IUser> = {
    name: payload.name,
    email: payload.email,
    password: payload.password,
    role: "student", // Assign the student role
  };

  // Start a new DB session
  const session = await mongoose.startSession();

  try {
    session.startTransaction(); // Begin transaction

    // Create the user account
    const [newUser] = await User.create([userData], { session });

    // Assign the newly created userId to the student record
    payload.userId = newUser._id;

    // Create the student record
    const [newStudent] = await Student.create([payload], { session });

    // Commit the transaction if all operations are successful and end the session
    await session.commitTransaction();
    session.endSession();

    //  Populate and return the student along with the user info
    const studentWithUser = await Student.findById(newStudent._id).populate(
      "userId"
    );
    return studentWithUser;
  } catch (error) {
    // If any error occurs, rollback the transaction and end the session
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

// Create and register a new teacher along with user credentials
const createTeacherIntoDB = async (payload: ITeacher & IUser) => {
  // Check if a user with the same email already exists
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new AppError(httpStatus.CONFLICT, "Email already exists", "email");
  }

  // Prepare user data for creation
  const userData: Partial<IUser> = {
    name: payload.name,
    email: payload.email,
    password: payload.password,
    role: "teacher", // Assign the teacher role
  };

  // Start a new DB session
  const session = await mongoose.startSession();

  try {
    session.startTransaction(); // Begin transaction

    // Create the user account
    const [newUser] = await User.create([userData], { session });

    // Assign the newly created userId to the teacher record
    payload.userId = newUser._id;

    // Create the teacher record
    const [newTeacher] = await Teacher.create([payload], { session });

    // Commit the transaction if all operations are successful and end the session
    await session.commitTransaction();
    session.endSession();

    // Populate and return the teacher along with the linked user data
    const teacherWithUser = await Teacher.findById(newTeacher._id).populate(
      "userId"
    );
    return teacherWithUser;
  } catch (error) {
    // If any error occurs, rollback the transaction and end the session
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const UserServices = {
  createStudentIntoDB,
  createTeacherIntoDB,
};
