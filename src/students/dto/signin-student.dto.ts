import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
} from 'class-validator';

export class SignInStudentDto {
  @IsEmail()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  student_email: string;

  @IsString()
  @IsNotEmpty()
  student_password: string;
}
