import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';

import { TasksService } from '@/tasks/tasks.service';
import { PrismaService } from '@/prisma/prisma.service';
import type * as PrismaType from 'generated/prisma/client';
import {
  type CreateProjectDto,
  type UpdateProjectDto,
} from '@myproject/api-types/projects';
import { CreateTaskDto } from '@myproject/api-types/tasks';

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
    dto: CreateProjectDto,
    userId: string,
  ): Promise<PrismaType.Project> {
    try {
      const project = dto.project;

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
    dto: UpdateProjectDto,
  ): Promise<PrismaType.Project> {
    try {
      const { title, content } = dto.project;

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

  async createProjectTask(
    projectId: string,
    dto: CreateTaskDto,
  ): Promise<PrismaType.Task> {
    try {
      return await this.tasksService.createTask(projectId, dto);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to fetch Projects');
    }
  }
}
