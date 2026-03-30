import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';
import type * as PrismaType from 'generated/prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private prismaSerice: PrismaService) {}

  async getProject(id: string): Promise<PrismaType.Project> {
    try {
      const project = await this.prismaSerice.project.findUnique({
        where: { id: id },
      });

      if (!project) throw new NotFoundException();

      return project;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllProjects(userId: string): Promise<PrismaType.Project[]> {
    try {
      const projects = await this.prismaSerice.project.findMany({
        where: { userId },
      });
      return projects;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createProject(
    body: ParameterDecorator,
    userId: string,
  ): Promise<PrismaType.Project> {
    try {
      const project = body['project'];
      if (!project || !userId) throw new InternalServerErrorException();

      const newProject = await this.prismaSerice.project.create({
        data: {
          title: project.title,
          content: project.content,
          userId: userId,
        },
      });

      return newProject;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProject(body, userId: string): Promise<PrismaType.Project> {
    try {
      const { title, content } = body;
      if (!title || !content) throw new Error('No data provided');

      const project = await this.prismaSerice.project.update({
        where: { id: userId },
        data: {
          title: title,
          content: content,
        },
      });

      return project;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProject(userId: string): Promise<PrismaType.Project> {
    try {
      const project = await this.prismaSerice.project.delete({
        where: { id: userId },
      });

      return project;
    } catch (error) {
      throw new Error(error);
    }
  }
}
