import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { TasksService } from '@/tasks/tasks.service';
import { PrismaService } from '@/prisma/prisma.service';
import type * as PrismaType from 'generated/prisma/client';
import {
  type ProjectCreateDto,
  type ProjectUpdateDto,
} from '@myproject/api-types/projects';
import { TaskCreateDto } from '@myproject/api-types/tasks';

@Injectable()
export class ProjectsService {
  constructor(
    private prismaService: PrismaService,
    private tasksService: TasksService,
  ) {}

  private async assertProjectOwner(userId: string, projectId: string) {
    const project = await this.prismaService.project.findFirst({
      where: { id: projectId, userId: userId },
    });

    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async getProject(
    userId: string,
    projectId: string,
  ): Promise<PrismaType.Project> {
    try {
      return await this.assertProjectOwner(userId, projectId);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        `Failed to fetch project with id ${projectId}`,
      );
    }
  }

  async getAllProjects(userId: string): Promise<PrismaType.Project[]> {
    try {
      const projects = await this.prismaService.project.findMany({
        where: { userId },
      });

      return projects;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch projects');
    }
  }

  async createProject(
    dto: ProjectCreateDto,
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
      throw new InternalServerErrorException('Failed to create project');
    }
  }

  async updateProject(
    userId: string,
    projectId: string,
    dto: ProjectUpdateDto,
  ): Promise<PrismaType.Project> {
    try {
      await this.assertProjectOwner(userId, projectId);

      const project = dto.project;

      const updatedProject = await this.prismaService.project.update({
        where: { id: projectId },
        data: {
          title: project.title,
          content: project.content,
        },
      });

      return updatedProject;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Project not found');
      }
      throw new InternalServerErrorException(
        `Failed to update project with id ${projectId}`,
      );
    }
  }

  async deleteProject(
    userId: string,
    projectId: string,
  ): Promise<PrismaType.Project> {
    try {
      await this.assertProjectOwner(userId, projectId);

      const project = await this.prismaService.project.delete({
        where: { id: projectId },
      });

      return project;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Project not found');
      }
      throw new InternalServerErrorException(
        `Failed to delete project with id ${projectId}`,
      );
    }
  }

  async getProjectTasks(
    userId: string,
    projectId: string,
  ): Promise<PrismaType.Task[]> {
    try {
      await this.assertProjectOwner(userId, projectId);
      const tasks = await this.tasksService.findAll(projectId);

      return tasks;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        `Failed to fetch tasks from project with id ${projectId}`,
      );
    }
  }

  async createProjectTask(
    userId: string,
    projectId: string,
    dto: TaskCreateDto,
  ): Promise<PrismaType.Task> {
    try {
      await this.assertProjectOwner(userId, projectId);

      return await this.tasksService.createTask(projectId, dto);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        `Failed to create task with project id ${projectId}`,
      );
    }
  }
}
