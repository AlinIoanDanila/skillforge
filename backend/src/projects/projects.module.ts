import { Module } from '@nestjs/common';

import { TasksService } from '@/tasks/tasks.service';
import { PrismaService } from '@/prisma/prisma.service';
import { ProjectsService } from '@/projects/projects.service';
import { ProjectsController } from '@/projects/projects.controller';

@Module({
  providers: [ProjectsService, PrismaService, TasksService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
