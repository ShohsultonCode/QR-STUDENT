import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Request,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Redirect,
  Res,
} from '@nestjs/common';
import { StudentService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { CheckStudentDto } from './dto/check-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { SignInStudentDto } from './dto/signin-student.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('students')
export class StudentsController {
  constructor(private readonly productsService: StudentService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Post('signup')
  @UseInterceptors()
  signup(@Body() CreateStudentDto: CreateStudentDto) {
    return this.productsService.signup(CreateStudentDto);
  }

  @Post('signin')
  signin(@Body() SignInStudentDto: SignInStudentDto) {
    return this.productsService.signin(SignInStudentDto);
  }

  @Post('check')
  check(@Body() CheckStudentDto: CheckStudentDto) {
    return this.productsService.check(CheckStudentDto);
  }

  @Get('generate')
  generate(@Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    return this.productsService.generate(token);
  }

  @Get('verify/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Request() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Request() req, @Res() res) {
    const student_id = req.cookies['student_id'];
    return this.productsService.googleLogin(req, student_id, res);
  }

  @Get('verify/:id')
  @Redirect()
  verify(@Param('id') id: string, @Res() res) {
    return this.productsService.verify(id, res);
  }

  @Get('findonebytoken')
  findOneByToken(@Request() req) {
    try {
      const token = req.headers.authorization.split(' ')[1];
    } catch (error) {
      return {
        statusCode: 401,
        message: 'No token',
      };
    }
    const token = req.headers.authorization.split(' ')[1];
    return this.productsService.findOneByToken(token);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateStudentDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
