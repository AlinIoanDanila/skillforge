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
  UseGuards,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { AuthGuard } from '@/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @HttpCode(HttpStatus.PARTIAL_CONTENT)
  @Patch(':id')
  updateTask(@Param('id') taskId: string, @Body() body) {
    return this.tasksService.updateTask(taskId, body);
  }
}
