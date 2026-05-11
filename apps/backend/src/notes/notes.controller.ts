import { Get, Post, Body, Param, UseGuards, Controller } from '@nestjs/common';

import { AuthGuard } from '@/guards/auth.guard';
import { NotesService } from '@/notes/notes.service';
import { CurrentUser } from '@/decorators/user.decorator';
import { CreateNoteSchema } from '@myproject/api-types/notes';
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';

import type { ICurrentUser } from '@/decorators/user.decorator';
import type { CreateNoteDto } from '@myproject/api-types/notes';

@UseGuards(AuthGuard)
@Controller('projects/:projectId/tasks/:taskId/notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  getNotes(
    @CurrentUser() user: ICurrentUser,
    @Param('taskId') taskId: string,
    @Param('projectId') projectId: string,
  ) {
    return this.notesService.getNotes(user.id, taskId, projectId);
  }

  @Post()
  createNote(
    @CurrentUser() user: ICurrentUser,
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
    @Body(new ZodValidationPipe(CreateNoteSchema)) dto: CreateNoteDto,
  ) {
    return this.notesService.createNote(user.id, projectId, taskId, dto);
  }
}
