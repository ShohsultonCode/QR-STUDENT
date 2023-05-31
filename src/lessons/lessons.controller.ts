import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly LessonsService: LessonsService) {}

  @Get()
  findAll() {
    return this.LessonsService.findAll();
  }

  @Post()
  create(@Body() CreateLessonDto: CreateLessonDto) {
    return this.LessonsService.create(CreateLessonDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.LessonsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() UpdateLessonDto: UpdateLessonDto) {
    return this.LessonsService.update(id, UpdateLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.LessonsService.remove(id);
  }
}
