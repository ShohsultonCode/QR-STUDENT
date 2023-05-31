import { Schema } from 'mongoose';

const LessonSchema = new Schema(
  {
    lesson_title: {
      type: String,
      required: true,
    },
    lesson_number: {
      type: String,
      required: true,
    },
    lesson_description: {
      type: String,
      required: true,
    },
    lesson_active_students: {
      type: Array,
      required: true,
      default: [],
      ref: 'students',
    },
  },
  {
    timestamps: true,
  },
);

export { LessonSchema };
