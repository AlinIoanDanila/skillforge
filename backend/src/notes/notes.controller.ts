import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('projects/:projectId/tasks/:taskId/notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  getNotes(
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
  ) {
    return this.notesService.getNotes(taskId);
  }

  @Post()
  createNote(
    @Param('taskId') taskId: string,
    @Body() dto: ParameterDecorator,
  ) {}
}
