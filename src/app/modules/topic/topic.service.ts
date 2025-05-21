import { Topic } from "./topic.model";
import { Lesson } from "../lesson/lesson.model";

const createTopic = async (lessonId: string, payload: any) => {
  const topic = await Topic.create({ ...payload, lessonId });
  await Lesson.findByIdAndUpdate(lessonId, {
    $push: { topics: topic._id },
  });
  return topic;
};

const getAllTopics = async () => {
  return await Topic.find();
};

const getSingleTopic = async (id: string) => {
  const topic = await Topic.findById(id);
  if (!topic) throw new Error("Topic not found");
  return topic;
};

const deleteTopic = async (id: string) => {
  const deleted = await Topic.findByIdAndDelete(id);
  if (!deleted) throw new Error("Topic not found or already deleted");
  return deleted;
};

export const TopicService = {
  createTopic,
  getAllTopics,
  getSingleTopic,
  deleteTopic,
};
