import mongoose from "mongoose";
import { IStudent } from "../student/student.interface";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { Student } from "../student/student.model";
import { ITeacher } from "../teacher/teacher.interface";
import { Teacher } from "../teacher/teacher.model";

const createStudentIntoDB = async (payload: IStudent & IUser) => {
  // Create a user object with the necessary fields from the payload
  const userData: Partial<IUser> = {
    name: payload.name,
    email: payload.email,
    password: payload.password,
    role: "student",
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Create a user (transaction-1)
    const newUserCreate = await User.create([userData], { session });

    payload.userId = newUserCreate[0]._id;

    // Create a student (transaction-2)
    const newStudentCreate = await Student.create([payload], { session });

    await session.commitTransaction();
    await session.endSession();

    return newStudentCreate;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const createTeacherIntoDB = async (payload: ITeacher & IUser) => {
  // Now payload.name, payload.email, payload.password are defined
  const userData: Partial<IUser> = {
    name:     payload.name,
    email:    payload.email,
    password: payload.password,
    role:     "teacher",
  };

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Create the User
    const [ newUser ] = await User.create([userData], { session });
    // Attach its _id to the teacher record
    payload.userId = newUser._id;

    // Create the Teacher
    const [ newTeacher ] = await Teacher.create([payload], { session });

    await session.commitTransaction();
    session.endSession();

    return newTeacher;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const UserServices = { createStudentIntoDB, createTeacherIntoDB };
