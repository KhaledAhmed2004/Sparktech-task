import { Topic } from "./topic.model";
import { Lesson } from "../lesson/lesson.model";
import { ITopic } from "./topic.interface";

const createTopic = async (lessonId: string, payload: any) => {
  const topic = await Topic.create({ ...payload, lessonId });
  await Lesson.findByIdAndUpdate(lessonId, {
    $push: { topics: topic._id },
  });
  return topic;
};

const getSingleTopic = async (id: string) => {
  const topic = await Topic.findOne({ _id: id, isDeleted: false });
  if (!topic) throw new Error("Topic not found");
  return topic;
};

// topic.service.ts
const deleteTopic = async (id: string) => {
  const deleted = await Topic.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  if (!deleted) throw new Error("Topic not found or already deleted");
  return deleted;
};

const getTopicsByLesson = async (lessonId: string) => {
  return await Topic.find({ lessonId, isDeleted: false });
};

const updateTopic = async (id: string, payload: Partial<ITopic>) => {
  const updated = await Topic.findByIdAndUpdate(id, payload, { new: true });
  if (!updated) throw new Error("Topic not found or could not be updated");
  return updated;
};

export const TopicService = {
  createTopic,
  getSingleTopic,
  deleteTopic,
  getTopicsByLesson,
  updateTopic,
};
