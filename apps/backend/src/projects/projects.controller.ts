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
import { CurrentUser, type ICurrentUser } from '@/decorators/user.decorator';

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
    @Body() body: ParameterDecorator,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.projectsService.createProject(body, user.userId);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Patch(':id')
  updateProject(
    @Param('id') projectId: string,
    @CurrentUser() user: ICurrentUser,
    @Body() body: ParameterDecorator,
  ) {
    return this.projectsService.updateProject(user.userId, projectId, body);
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
    @Body() body: ParameterDecorator,
  ) {
    return this.projectsService.createProjectTask(projectId, body);
  }
}
