import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  async findAllProjects() {
    return this.projectService.findAll();
  }

  @Get(':id')
  async findProjectById(@Param('id') id: number) {
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  async updateProject(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  async removeProject(@Param('id') id: number) {
    return this.projectService.remove(id);
  }
}
