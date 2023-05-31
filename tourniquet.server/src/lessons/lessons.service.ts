import {
  Injectable,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Model } from 'mongoose';
import Lesson from 'src/types/lesson.type';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel('lessons') private readonly lessons: Model<Lesson>,
  ) {}

  async findAll() {
    try {
      const data = await this.lessons
        .find()
        .populate({
          path: 'lesson_active_students',
          select: 'student_first_name student_last_name student_email',
        })
        .exec();

      return {
        status: 200,
        message: 'Lessons found successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(CreateLessonDto: CreateLessonDto) {
    const { lesson_title, lesson_number, lesson_description } = CreateLessonDto;

    const isLessonTitleExist = await this.lessons.findOne({ lesson_title });
    const isLessonDecriptionExist = await this.lessons.findOne({
      lesson_description,
    });

    if (isLessonTitleExist || isLessonDecriptionExist) {
      throw new HttpException(
        'Lesson with this title or description already exist',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const data = await this.lessons.create({
        lesson_title,
        lesson_number,
        lesson_description,
      });

      return {
        status: 201,
        message: 'Lesson created successfully',
        data,
      };
    }
  }

  async findOne(id: string) {
    if (id.length !== 24)
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);

    const data = await this.lessons.findById(id);
    const isIdExist = await this.lessons.findById(id);

    if (!isIdExist) {
      throw new HttpException(
        'Lesson with this id not found',
        HttpStatus.NOT_FOUND,
      );
    } else if (!data) {
      throw new HttpException(
        'Lesson with this id not found',
        HttpStatus.NOT_FOUND,
      );
    } else if (!data) {
      throw new HttpException(
        'Lesson with this id not found',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return {
        status: 200,
        message: 'Lesson found successfully',
        data,
      };
    }
  }

  async update(id: string, updateCategoryDto: UpdateLessonDto) {
    if (id.length !== 24)
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);

    const data = await this.lessons.findById(id);
    const { lesson_title, lesson_number, lesson_description } =
      updateCategoryDto;

    if (!data) {
      throw new HttpException(
        'Lesson with this id not found',
        HttpStatus.NOT_FOUND,
      );
    } else {
      const data = await this.lessons.findByIdAndUpdate(
        id,
        {
          lesson_title,
          lesson_number,
          lesson_description,
        },
        { new: true },
      );

      return {
        status: 200,
        message: 'Lesson updated successfully',
        data,
      };
    }
  }

  async remove(id: string) {
    if (id.length !== 24)
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);

    const data = await this.lessons.findById(id);

    if (!data) {
      throw new HttpException(
        'Lesson with this id not found',
        HttpStatus.NOT_FOUND,
      );
    } else {
      await this.lessons.findByIdAndDelete(id);

      return {
        status: 200,
        message: 'Lesson deleted successfully',
      };
    }
  }
}
