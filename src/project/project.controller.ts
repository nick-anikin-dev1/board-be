import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateProjectDto, 
         @Request() req) {
    return this.projectService.create(dto, req.user.id);
  }

  @Get('find')
  async findAllProjects() {
    return this.projectService.findAll();
  }

  @Get('findOne')
  @UseGuards(JwtAuthGuard)
  findProjectById(@Request() req) {
    return req.user;
  }

  @Patch('update')
  @UseGuards(JwtAuthGuard)
  async updateProject(@Body() dto: UpdateProjectDto,
                      @Request() req) {
    return this.projectService.update(req.user.id, dto);
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  async removeProject(@Param('id') id: number,
                      @Request() req) {
    return this.projectService.remove(id, req.user.id);
  }
}
