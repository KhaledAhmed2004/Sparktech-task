import { Course } from "../course/course.model";
import { Like } from "./like.model";

const likeCourse = async (userId: string, courseId: string) => {
  // Check if already liked
  const alreadyLiked = await Like.findOne({ user: userId, course: courseId });
  if (alreadyLiked) {
    throw new Error("Course already liked by this user");
  }

  // Create like and increment count
  const like = await Like.create({ user: userId, course: courseId });
  await Course.findByIdAndUpdate(courseId, { $inc: { likeCount: 1 } });

  return like;
};

const unlikeCourse = async (userId: string, courseId: string) => {
  const deleted = await Like.findOneAndDelete({
    user: userId,
    course: courseId,
  });

  if (!deleted) {
    throw new Error("Like not found");
  }

  await Course.findByIdAndUpdate(courseId, { $inc: { likeCount: -1 } });

  return deleted;
};

export const LikeService = {
  likeCourse,
  unlikeCourse,
};
