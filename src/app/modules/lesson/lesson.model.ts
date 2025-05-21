import { Schema, model, Types } from 'mongoose';

const lessonSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  courseId: { type: Types.ObjectId, ref: 'Course', required: true },
  topics: [{ type: Types.ObjectId, ref: 'Topic' }],
  duration: { type: Number, required: true }, // duration in minutes
});

export const Lesson = model('Lesson', lessonSchema);
