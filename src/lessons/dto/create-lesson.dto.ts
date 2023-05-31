import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumberString,
  IsNumber,
} from 'class-validator';

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(32)
  lesson_title: string;

  @IsNumber()
  @IsNotEmpty()
  lesson_number: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(1024)
  lesson_description: string;
}
