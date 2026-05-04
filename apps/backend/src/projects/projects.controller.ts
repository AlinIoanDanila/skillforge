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
  type ProjectCreateDto,
  type ProjectUpdateDto,
  type ProjectIdParamsDto,
  ProjectCreateSchema,
  ProjectIdParamsSchema,
  ProjectUpdateSchema,
} from '@myproject/api-types/projects';

import {
  type TaskCreateDto,
  TaskCreateSchema,
} from '@myproject/api-types/tasks';

@UseGuards(AuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getProject(
    @CurrentUser() user: ICurrentUser,
    @Param(new ZodValidationPipe(ProjectIdParamsSchema))
    params: ProjectIdParamsDto,
  ) {
    return this.projectsService.getProject(user.id, params.id);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  getAllProjects(@CurrentUser() user: ICurrentUser) {
    return this.projectsService.getAllProjects(user.id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createProject(
    @CurrentUser() user: ICurrentUser,
    @Body(new ZodValidationPipe(ProjectCreateSchema)) dto: ProjectCreateDto,
  ) {
    return this.projectsService.createProject(dto, user.id);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Patch(':id')
  updateProject(
    @CurrentUser() user: ICurrentUser,
    @Body(new ZodValidationPipe(ProjectUpdateSchema)) dto: ProjectUpdateDto,
    @Param(new ZodValidationPipe(ProjectIdParamsSchema))
    params: ProjectIdParamsDto,
  ) {
    return this.projectsService.updateProject(user.id, params.id, dto);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Delete(':id')
  deleteProject(
    @CurrentUser() user: ICurrentUser,
    @Param(new ZodValidationPipe(ProjectIdParamsSchema))
    params: ProjectIdParamsDto,
  ) {
    return this.projectsService.deleteProject(user.id, params.id);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Get(':id/tasks')
  getProjectTasks(
    @CurrentUser() user: ICurrentUser,
    @Param(new ZodValidationPipe(ProjectIdParamsSchema))
    params: ProjectIdParamsDto,
  ) {
    return this.projectsService.getProjectTasks(user.id, params.id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(':id/tasks')
  createProjectTasks(
    @CurrentUser() user: ICurrentUser,
    @Param(new ZodValidationPipe(ProjectIdParamsSchema))
    params: ProjectIdParamsDto,
    @Body(new ZodValidationPipe(TaskCreateSchema)) dto: TaskCreateDto,
  ) {
    return this.projectsService.createProjectTask(user.id, params.id, dto);
  }
}
