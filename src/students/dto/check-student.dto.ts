import { IsString, IsNotEmpty } from 'class-validator';

export class CheckStudentDto {
  @IsString()
  @IsNotEmpty()
  student_id: string;
}
