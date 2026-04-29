import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
  Param,
  Delete,
} from '@nestjs/common';

import { AuthGuard } from '@/guards/auth.guard';
import { ProjectsService } from '@/projects/projects.service';
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';
import { CurrentUser, type ICurrentUser } from '@/decorators/user.decorator';
import {
  UpdateProjectSchema,
  CreateProjectSchema,
} from '@myproject/api-types/projects';

import {
  CreateTaskSchema,
  type CreateTaskDto,
} from '@myproject/api-types/tasks';

import {
  type UpdateProjectDto,
  type CreateProjectDto,
} from '@myproject/api-types/projects';

@UseGuards(AuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getProject(
    @CurrentUser() user: ICurrentUser,
    @Param('id') projectId: string,
  ) {
    const userId = user.userId;
    return this.projectsService.getProject(userId, projectId);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  getAllProjects(@CurrentUser() user: ICurrentUser) {
    return this.projectsService.getAllProjects(user.userId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createProject(
    @Body(new ZodValidationPipe(CreateProjectSchema)) dto: CreateProjectDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.projectsService.createProject(dto, user.userId);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Patch(':id')
  updateProject(
    @Param('id') projectId: string,
    @CurrentUser() user: ICurrentUser,
    @Body(new ZodValidationPipe(UpdateProjectSchema)) dto: UpdateProjectDto,
  ) {
    return this.projectsService.updateProject(user.userId, projectId, dto);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Delete(':id')
  deleteProject(
    @CurrentUser() user: ICurrentUser,
    @Param('id') projectId: string,
  ) {
    return this.projectsService.deleteProject(user.userId, projectId);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Get(':id/tasks')
  getProjectTasks(@Param('id') projectId: string) {
    return this.projectsService.getProjectTasks(projectId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(':id/tasks')
  createProjectTasks(
    @Param('id') projectId: string,
    @Body(new ZodValidationPipe(CreateTaskSchema)) dto: CreateTaskDto,
  ) {
    return this.projectsService.createProjectTask(projectId, dto);
  }
}
