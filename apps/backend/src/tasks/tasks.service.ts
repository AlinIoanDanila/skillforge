import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

import type * as PrismaType from 'generated/prisma/client';
import { TaskCreateDto, TaskUpdateDto } from '@myproject/api-types/tasks';
import { isPrismaErrorCode } from '@/prisma/prisma-error';

@Injectable()
export class TasksService {
  constructor(private prismaService: PrismaService) {}

  async createTask(
    projectId: string,
    dto: TaskCreateDto,
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
      if (isPrismaErrorCode(error, 'P2025')) {
        throw new NotFoundException('Task not found');
      }
      throw new InternalServerErrorException('Failed to fetch tasks');
    }
  }

  async updateTask(
    userId: string,
    taskId: string,
    dto: TaskUpdateDto,
  ): Promise<PrismaType.Task> {
    try {
      const taskData = dto.task;

      const updatedTask = await this.prismaService.task.update({
        where: {
          id: taskId,
          project: { userId: userId },
        },
        data: {
          title: taskData.title,
          content: taskData.content,
          isDone: taskData.isDone,
        },
      });

      return updatedTask;
    } catch (error) {
      if (isPrismaErrorCode(error, 'P2025')) {
        throw new NotFoundException('Task not found');
      }
      throw new InternalServerErrorException('Failed to update task');
    }
  }

  async deleteTask(userId: string, taskId: string): Promise<PrismaType.Task> {
    try {
      const deletedTask = await this.prismaService.task.delete({
        where: {
          id: taskId,
          project: { userId: userId },
        },
      });

      return deletedTask;
    } catch (error) {
      if (isPrismaErrorCode(error, 'P2025')) {
        throw new NotFoundException('Task not found');
      }
      throw new InternalServerErrorException('Failed to delete task');
    }
  }
}
