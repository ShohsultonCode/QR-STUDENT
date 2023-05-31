import { Module } from '@nestjs/common';
import { StudentService } from './students.service';
import { StudentsController } from './students.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from 'src/models/students.schema';
import { LessonSchema } from 'src/models/lessons.schema';
import { GoogleStrategy } from './google.strategy'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'students', schema: StudentSchema }]),
    MongooseModule.forFeature([{ name: 'lessons', schema: LessonSchema }]),
  ],
  controllers: [StudentsController],
  providers: [StudentService, GoogleStrategy],
})
export class ProductsModule {}
