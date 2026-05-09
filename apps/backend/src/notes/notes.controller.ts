import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  NotImplementedException,
  UsePipes,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@/guards/auth.guard';
import { NotesService } from '@/notes/notes.service';
import { CreateNoteSchema } from '@myproject/api-types/notes';
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';

import type { CreateNoteDto } from '@myproject/api-types/notes';
import { CurrentUser, type ICurrentUser } from '@/decorators/user.decorator';

@UseGuards(AuthGuard)
@Controller('projects/:projectId/tasks/:taskId/notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  // @Get()
  // getNotes(
  //   @Param('projectId') projectId: string,
  //   @Param('taskId') taskId: string,
  // ) {
  //   throw new NotImplementedException();
  //   return this.notesService.getNotes(taskId);
  // }

  @Post()
  createNote(
    @CurrentUser() user: ICurrentUser,
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
    @Body(new ZodValidationPipe(CreateNoteSchema)) dto: CreateNoteDto,
  ) {
    const userId = user.id;
    return this.notesService.createNote(userId, projectId, taskId, dto);
  }
}
