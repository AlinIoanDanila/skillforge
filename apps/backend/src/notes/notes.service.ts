import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class NotesService {
  constructor(private prismaService: PrismaService) {}

  async getNotes(taskId: string) {
    const notes = await this.prismaService.note.findMany({
      where: { taskId: taskId },
    });

    return notes;
  }

  async createNote(taskId: string, createNoteDto: ParameterDecorator) {
    const noteDto = createNoteDto['note'];

    const newNote = await this.prismaService.note.create({
      data: {
        title: noteDto.title,
        content: noteDto.content,
        taskId,
      },
    });

    return newNote;
  }
}
