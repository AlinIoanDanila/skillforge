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
    @Request() req: ParameterDecorator,
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
    @Body(new ZodValidationPipe(CreateNoteSchema)) dto: CreateNoteDto,
  ) {
    const userId = req['user'].userId;
    return this.notesService.createNote(userId, projectId, taskId, dto);
  }
}
