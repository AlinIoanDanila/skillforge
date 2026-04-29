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
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';
import {
  type UpdateTaskDto,
  UpdateTaskSchema,
} from '@myproject/api-types/tasks';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @HttpCode(HttpStatus.PARTIAL_CONTENT)
  @Patch(':id')
  updateTask(
    @Param('id') taskId: string,
    @Body(new ZodValidationPipe(UpdateTaskSchema)) dto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(taskId, dto);
  }
}
