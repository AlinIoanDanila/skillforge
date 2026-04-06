import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotImplementedException,
  HttpCode,
  HttpStatus,
  Request,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @HttpCode(HttpStatus.PARTIAL_CONTENT)
  @Patch(':id')
  updateTask(@Param('id') taskId: string, @Body() body) {
    return this.tasksService.updateTask(taskId, body);
  }
}
