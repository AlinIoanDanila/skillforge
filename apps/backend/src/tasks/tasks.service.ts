import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
  InternalServerErrorException,
} from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

import type * as PrismaType from 'generated/prisma/client';
import { CreateTaskDto, UpdateTaskDto } from '@myproject/api-types/tasks';

@Injectable()
export class TasksService {
  constructor(private prismaService: PrismaService) {}

  async createTask(
    projectId: string,
    dto: CreateTaskDto,
  ): Promise<PrismaType.Task> {
    const taskData = dto.task;

    const newTask = await this.prismaService.task.create({
      data: {
        content: taskData.content,
        title: taskData.title,
        projectId: projectId,
      },
    });

    return newTask;
  }

  async findAll(projectId: string): Promise<PrismaType.Task[]> {
    try {
      const tasks = await this.prismaService.task.findMany({
        where: {
          projectId: projectId,
        },
      });

      return tasks;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to fetch Tasks');
    }
  }

  async updateTask(
    taskId: string,
    dto: UpdateTaskDto,
  ): Promise<PrismaType.Task> {
    try {
      const taskData = dto.task;

      const updatedTask = await this.prismaService.task.update({
        where: {
          id: taskId,
        },
        data: {
          title: taskData.title,
          content: taskData.content,
          isDone: taskData.isDone,
        },
      });

      return updatedTask;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to update task');
    }
  }
}
