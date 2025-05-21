import { Schema, model, Types } from 'mongoose';

const topicSchema = new Schema({
  title: { type: String, required: true },
  content: String,
  lessonId: { type: Types.ObjectId, ref: 'Lesson', required: true },
  quiz: { type: Types.ObjectId, ref: 'Quiz' }, // optional
});

export const Topic = model('Topic', topicSchema);
