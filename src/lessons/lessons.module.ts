import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonSchema } from 'src/models/lessons.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'lessons', schema: LessonSchema }]),
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonModule {}
