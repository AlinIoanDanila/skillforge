import {
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { AuthGuard } from '@/guards/auth.guard';
import { CurrentUser } from '@/decorators/user.decorator';
import { TaskUpdateSchema } from '@myproject/api-types/tasks';
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';

import { type ICurrentUser } from '@/decorators/user.decorator';
import { type TaskUpdateDto } from '@myproject/api-types/tasks';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @HttpCode(HttpStatus.PARTIAL_CONTENT)
  @Patch(':id')
  updateTask(
    @CurrentUser() user: ICurrentUser,
    @Param('id') taskId: string,
    @Body(new ZodValidationPipe(TaskUpdateSchema)) dto: TaskUpdateDto,
  ) {
    return this.tasksService.updateTask(user.id, taskId, dto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteTask(@CurrentUser() user: ICurrentUser, @Param('id') taskId: string) {
    return this.tasksService.deleteTask(user.id, taskId);
  }
}
