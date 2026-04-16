import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

import type { CreateNoteDto } from '@myproject/api-types/notes';

@Injectable()
export class NotesService {
  constructor(private prismaService: PrismaService) {}

  async getNotes(taskId: string) {
    const notes = await this.prismaService.note.findMany({
      where: { taskId: taskId },
    });

    return notes;
  }

  async createNote(
    userId: string,
    projectId: string,
    taskId: string,
    createNoteDto: CreateNoteDto,
  ): Promise<CreateNoteDto> {
    const task = await this.prismaService.task.findFirst({
      where: {
        id: taskId,
        projectId: projectId,
        project: { userId: userId },
      },
    });

    if (!task) throw new NotFoundException('Task not found');

    return await this.prismaService.note.create({
      data: {
        title: createNoteDto.title,
        content: createNoteDto.content,
        taskId,
      },
    });
  }
}
