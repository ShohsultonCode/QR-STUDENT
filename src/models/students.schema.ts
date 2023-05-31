import { Schema } from 'mongoose';

const StudentSchema = new Schema(
  {
    student_first_name: {
      type: String,
      required: true,
    },
    student_last_name: {
      type: String,
      required: true,
    },
    student_email: {
      type: String,
      required: true,
    },
    student_google_id: {
      type: String,
      default: null,
    },
    student_phone: {
      type: String,
      required: true,
    },
    student_password: {
      type: String,
      required: true,
    },
    student_lesson: {
      type: String,
      required: true,
      ref: 'lessons',
    },
    student_is_activated: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export { StudentSchema };
