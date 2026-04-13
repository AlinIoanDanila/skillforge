import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';

import { TasksService } from '@/tasks/tasks.service';
import { PrismaService } from '@/prisma/prisma.service';
import type * as PrismaType from 'generated/prisma/client';

@Injectable()
export class ProjectsService {
  constructor(
    private prismaService: PrismaService,
    private tasksService: TasksService,
  ) {}

  async getProject(
    userId: string,
    projectId: string,
  ): Promise<PrismaType.Project> {
    try {
      const project = await this.prismaService.project.findFirst({
        where: { id: projectId, userId: userId },
      });

      if (!project) throw new NotFoundException('Project not found');

      return project;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to fetch Project');
    }
  }

  async getAllProjects(userId: string): Promise<PrismaType.Project[]> {
    try {
      const projects = await this.prismaService.project.findMany({
        where: { userId },
      });

      return projects;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch Projects');
    }
  }

  async createProject(
    body: ParameterDecorator,
    userId: string,
  ): Promise<PrismaType.Project> {
    try {
      const project = body['project'];
      if (!project || !userId) throw new NotAcceptableException();

      const newProject = await this.prismaService.project.create({
        data: {
          title: project.title,
          content: project.content,
          userId: userId,
        },
      });

      return newProject;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to fetch Projects');
    }
  }

  async updateProject(
    userId: string,
    projectId: string,
    body: ParameterDecorator,
  ): Promise<PrismaType.Project> {
    try {
      const { title, content } = body['project'];
      if (!title || !content)
        throw new NotAcceptableException('No data provided');

      const project = await this.prismaService.project.update({
        where: { id: projectId, userId },
        data: {
          title: title,
          content: content,
        },
      });

      return project;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to fetch Projects');
    }
  }

  async deleteProject(
    userId: string,
    projectId: string,
  ): Promise<PrismaType.Project> {
    try {
      const project = await this.prismaService.project.delete({
        where: { id: projectId, userId },
      });

      return project;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to fetch Projects');
    }
  }

  async getProjectTasks(projectId: string): Promise<PrismaType.Task[]> {
    try {
      const tasks = await this.tasksService.findAll(projectId);

      return tasks;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to fetch Projects');
    }
  }

  async createProjectTask(projectId: string, body): Promise<PrismaType.Task> {
    try {
      return await this.tasksService.createTask(projectId, body);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to fetch Projects');
    }
  }
}
