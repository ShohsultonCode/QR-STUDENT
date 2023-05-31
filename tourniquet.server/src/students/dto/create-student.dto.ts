import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsNumberString,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  student_first_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  student_last_name: string;

  @IsEmail()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  student_email: string;

  @IsNumberString()
  @IsNotEmpty()
  @MinLength(13)
  @MaxLength(13)
  student_phone: string;

  @IsString()
  @IsNotEmpty()
  student_password: string;

  @IsString()
  @IsNotEmpty()
  student_lesson: string;
}
