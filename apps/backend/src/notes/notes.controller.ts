import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotImplementedException,
  UsePipes,
} from '@nestjs/common';

import { NotesService } from './notes.service';
import { CreateNoteSchema } from '@myproject/api-types';
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';

import type { CreateNoteDto } from '@myproject/api-types';

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
    @Param('taskId') taskId: string,
    @Body(new ZodValidationPipe(CreateNoteSchema)) dto: CreateNoteDto,
  ) {
    console.log('dto', dto);

    return this.notesService.createNote(taskId, dto);
  }
}
