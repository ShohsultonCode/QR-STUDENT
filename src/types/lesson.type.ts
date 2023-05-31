import { Document } from 'mongoose';

interface ILessons extends Document {
  id: string;
  lesson_title: string;
  lesson_number: string;
  lesson_description: string;
  lesson_active_students: string[];
  created_at: Date;
  updated_at: Date;
}

export default ILessons;
