import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
  InternalServerErrorException,
} from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

import type * as PrismaType from 'generated/prisma/client';

@Injectable()
export class TasksService {
  constructor(private prismaService: PrismaService) {}

  async createTask(projectId: string, body): Promise<PrismaType.Task> {
    const taskData = body['task'];

    if (!taskData || !projectId) throw new NotAcceptableException();

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

  // findOne(id: number) {
  //   throw new NotImplementedException();

  //   return `This action returns a #${id} task`;
  // }

  async updateTask(
    taskId: string,
    body: ParameterDecorator,
  ): Promise<PrismaType.Task> {
    try {
      if (!taskId || !body['task'])
        throw new NotAcceptableException('data or id not provided');
      const taskData = body['task'];

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
