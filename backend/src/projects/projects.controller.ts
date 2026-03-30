import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Request,
  UseGuards,
  Param,
  Delete,
} from '@nestjs/common';

import { AuthGuard } from '@/auth/guards/auth.guard';
import { ProjectsService } from '@/projects/projects.service';

@UseGuards(AuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getProject(@Param('id') id: string) {
    return this.projectsService.getProject(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  getAllProjects(@Request() req: ParameterDecorator) {
    return this.projectsService.getAllProjects(req['user'].userId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createProject(
    @Body() body: ParameterDecorator,
    @Request() req: ParameterDecorator,
  ) {
    return this.projectsService.createProject(body, req['user'].userId);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Patch(':id')
  updateProject(@Param('id') id: string, @Body() body: ParameterDecorator) {
    return this.projectsService.updateProject(body, id);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Delete(':id')
  deleteProject(@Param('id') id: string) {
    return this.projectsService.deleteProject(id);
  }
}
