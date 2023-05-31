import { Document } from 'mongoose';

interface IStudent extends Document {
  id: string;
  student_first_name: string;
  student_last_name: string;
  student_email: string;
  student_google_id: string;
  student_phone: string;
  student_password: string;
  student_lesson: string;
  student_is_activated: boolean;
  created_at: Date;
  updated_at: Date;
}

export default IStudent;
