import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { User } from '../types/user.types';
import { IUser } from '../types/types';

@Controller('project')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(@Body() dto: CreateProjectDto, @User() user: IUser) {
    return this.projectService.create(dto, user);
  }

  @Get()
  async findAllProjects() {
    return this.projectService.findAll();
  }

  @Patch(':id')
  async updateProject(@Param('id') id: string, @Body() dto: UpdateProjectDto, @User() user: IUser) {
    return this.projectService.update(+id, user, dto);
  }

  @Delete(':id')
  async removeProject(@Param('id') id: string, @User() user: IUser) {
    return this.projectService.remove(+id, user);
  }
}
