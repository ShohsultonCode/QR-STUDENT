import {
  Injectable,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { CheckStudentDto } from './dto/check-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { SignInStudentDto } from './dto/signin-student.dto';

import { VerifyGoogleStudentDto } from './dto/verify-google-student.dto';

import { Model } from 'mongoose';
import Student from 'src/types/student.type';
import Lesson from 'src/types/lesson.type';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as QRCode from 'qrcode';
import { log } from 'console';

@Injectable()
export class StudentService {
  client: any;
  constructor(
    @InjectModel('students') private readonly Students: Model<Student>,
    @InjectModel('lessons') private readonly Lessons: Model<Lesson>,
  ) {}

  async findAll() {
    try {
      const data = await this.Students.find();
      return {
        status: 200,
        message: 'Students found successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async signup(CreateStudentDto: CreateStudentDto) {
    const {
      student_first_name,
      student_last_name,
      student_email,
      student_phone,
      student_password,
      student_lesson,
    } = CreateStudentDto;

    const isStudentEmailExist = await this.Students.findOne({
      student_email,
    });
    const isStudentPhoneExist = await this.Students.findOne({
      student_phone,
    });

    try {
      const id = await this.Lessons.findOne({
        _id: student_lesson,
      });
    } catch (error) {
      throw new HttpException(
        'Lesson with this id not found',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (isStudentEmailExist || isStudentPhoneExist) {
      throw new HttpException(
        'Student with this email or phone already exist',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const hashedPassword = await bcrypt.hash(student_password, 10);

      const data = await this.Students.create({
        student_first_name,
        student_last_name,
        student_email,
        student_phone,
        student_password: hashedPassword,
        student_lesson,
      });

      const token = jwt.sign(
        {
          student_id: data._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '10h',
        },
      );

      return {
        status: 201,
        message: 'Student created successfully',
        access_token: token,
        data,
      };
    }
  }

  async signin(SignInStudentDto: SignInStudentDto) {
    const { student_email, student_password } = SignInStudentDto;

    const isStudentExist = await this.Students.findOne({
      student_email,
    });

    if (!isStudentExist) {
      throw new HttpException(
        'Student with this email does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    const isPasswordValid = await bcrypt.compare(
      student_password,
      isStudentExist.student_password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Password is not valid', HttpStatus.UNAUTHORIZED);
    }

    const token = jwt.sign(
      {
        student_id: isStudentExist._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '10h',
      },
    );

    return {
      status: 200,
      message: 'Student logged in successfully',
      access_token: token,
      data: isStudentExist,
    };
  }

  async check(CheckStudentDto: CheckStudentDto) {
    const { student_id } = CheckStudentDto;

    const isStudentExist = await this.Students.findOne({
      _id: student_id,
    });

    if (!isStudentExist) {
      throw new HttpException(
        'Student with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    const isLessonExist = await this.Lessons.findOne({
      lesson_active_students: student_id,
    });

    const isStudentActivated = await this.Students.findOne({
      _id: student_id,
      student_is_activated: true,
    });

    if (!isStudentActivated) {
      throw new HttpException(
        'Student with this id is not activated',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!isLessonExist) {
      await this.Lessons.updateOne(
        { _id: isStudentExist.student_lesson },
        {
          $push: {
            lesson_active_students: student_id,
          },
        },
        { new: true },
      );

      return {
        status: 200,
        message: 'Student joined lesson successfully',
      };
    } else {
      await this.Lessons.updateOne(
        { _id: isStudentExist.student_lesson },
        {
          $pull: {
            lesson_active_students: student_id,
          },
        },
        { new: true },
      );

      return {
        status: 200,
        message: 'Student left lesson successfully',
      };
    }
  }

  async findOneByToken(token: string) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const decoded = jwt.decode(token);
    if (!decoded) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    const student_id = decoded['student_id'];

    const isStudentExist = await this.Students.findOne({
      _id: student_id,
    });

    if (!isStudentExist) {
      throw new HttpException(
        'Student with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      status: 200,
      message: 'Student found successfully',
      data: isStudentExist,
    };
  }

  async findOne(id: string) {
    if (id.length !== 24)
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);

    const data = await this.Students.findById(id);
    if (!data) {
      throw new HttpException(
        'Student with this id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      status: 200,
      message: 'Student found successfully',
      data,
    };
  }

  async verify(id: string, res: any) {
    if (id.length !== 24)
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);

    const data = await this.Students.findById(id);
    if (!data) {
      throw new HttpException(
        'Student with this id not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const isStudentActivated = await this.Students.findOne({
      _id: id,
      student_is_activated: true,
    });

    if (isStudentActivated) {
      res.redirect('http://localhost:5173/dashboard');
    }

    res.cookie('student_id', id, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.redirect('http://localhost:4000/students/verify/google');
  }

  async verifyGoogle(token: string) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const decoded = jwt.decode(token);
    if (!decoded) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    const student_id = decoded['student_id'];

    const isStudentExist = await this.Students.findOne({
      _id: student_id,
    });

    if (!isStudentExist) {
      throw new HttpException(
        'Student with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    const isStudentActivated = await this.Students.findOne({
      _id: student_id,
      student_is_activated: true,
    });

    if (!isStudentActivated) {
      const data = await this.Students.findByIdAndUpdate(
        student_id,
        {
          student_is_activated: true,
        },
        { new: true },
      );

      return {
        status: 200,
        message: 'Student activated successfully',
        data,
      };
    } else {
      return {
        status: 200,
        message: 'Student already activated',
      };
    }
  }

  async googleLogin(req, student_id, res) {
    const isStudentExist = await this.Students.findOne({
      _id: student_id,
    });

    if (!isStudentExist) {
      throw new HttpException(
        'Student with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    const isStudentActivated = await this.Students.findOne({
      _id: student_id,
      student_is_activated: true,
    });

    const { email, googleId } = req.user;
    const isStudentEmailMatch = await this.Students.findOne({
      student_email: email,
    });

    if (!isStudentEmailMatch) {
      throw new HttpException(
        'Student email does not match',
        HttpStatus.NOT_FOUND,
      );
    }

    const isStudentEmailExist = await this.Students.findOne({
      student_email: email,
    });

    if (!isStudentEmailExist) {
      throw new HttpException(
        'Student with this email does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    if (!isStudentActivated) {
      const data = await this.Students.findByIdAndUpdate(
        student_id,
        {
          student_google_id: googleId,
          student_is_activated: true,
        },
        { new: true },
      );

      res.redirect('http://localhost:5173/dashboard');
    } else {
      res.redirect('http://localhost:5173/dashboard');
    }
  }

  async update(id: string, UpdateStudentDto: UpdateStudentDto) {
    try {
      if (id.length !== 24)
        throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);

      const data = await this.Students.findById(id);
      const {
        student_first_name,
        student_last_name,
        student_email,
        student_phone,
        student_password,
        student_lesson,
      } = UpdateStudentDto;

      if (!data) {
        throw new HttpException(
          'Category with this id not found',
          HttpStatus.NOT_FOUND,
        );
      } else {
        const hashedPassword = await bcrypt.hash(student_password, 10);

        const data = await this.Students.findByIdAndUpdate(
          id,
          {
            student_first_name,
            student_last_name,
            student_email,
            student_phone,
            student_password: hashedPassword,
            student_lesson,
          },
          { new: true },
        );

        return {
          status: 200,
          message: 'Student updated successfully',
          data,
        };
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async generate(token: string) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const decoded = jwt.decode(token);
    if (!decoded) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    const student_id = decoded['student_id'];

    const isStudentExist = await this.Students.findOne({
      _id: student_id,
    });

    if (!isStudentExist) {
      throw new HttpException(
        'Student with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    const isStudentActivated = await this.Students.findOne({
      _id: student_id,
      student_is_activated: true,
    });

    if (!isStudentActivated) {
      throw new HttpException(
        'Student with this id is not activated',
        HttpStatus.BAD_REQUEST,
      );
    }

    const qrCode = await QRCode.toDataURL(student_id);

    return {
      status: 200,
      message: 'QR code generated successfully',
      data: qrCode,
    };
  }

  async remove(id: string) {
    try {
      if (id.length !== 24)
        throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);

      const data = await this.Students.findByIdAndDelete(id);

      if (!data) {
        throw new HttpException(
          'Student with this id not found',
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        status: 200,
        message: 'Student deleted successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
