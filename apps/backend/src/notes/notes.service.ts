import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

import { CreateNoteDto } from '@myproject/api-types';

@Injectable()
export class NotesService {
  constructor(private prismaService: PrismaService) {}

  async getNotes(taskId: string) {
    const notes = await this.prismaService.note.findMany({
      where: { taskId: taskId },
    });

    return notes;
  }

  async createNote(taskId: string, createNoteDto: CreateNoteDto) {
    const newNote = await this.prismaService.note.create({
      data: {
        title: createNoteDto.title,
        content: createNoteDto.content,
        taskId,
      },
    });

    return newNote;
  }
}
