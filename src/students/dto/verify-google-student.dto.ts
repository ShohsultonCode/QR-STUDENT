import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsBoolean,
} from 'class-validator';

export class VerifyGoogleStudentDto {
  // @IsString()
  // @IsNotEmpty()
  // @MinLength(2)
  // @MaxLength(50)
  // student_first_name: string;

  // @IsString()
  // @IsNotEmpty()
  // @MinLength(2)
  // @MaxLength(50)
  // student_last_name: string;

  // @IsEmail()
  // @IsNotEmpty()
  // @MinLength(2)
  // @MaxLength(100)
  // student_email: string;

  // @IsString()
  // @IsNotEmpty()
  // @MinLength(13)
  // @MaxLength(13)
  // student_phone: string;

  // @IsString()
  // @IsNotEmpty()
  // student_password: string;

  // @IsString()
  // @IsNotEmpty()
  // student_lesson: string;

  @IsString()
  @IsNotEmpty()
  student_google_id: string;

  @IsBoolean()
  @IsNotEmpty()
  student_is_activated: boolean;
}
