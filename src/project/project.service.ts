import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entity/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(dto: CreateProjectDto, userId: number) {
    const existProject = await this.projectRepository.findOne({
      where: {
        alias: dto.alias,
      },
    });
    if (existProject)
      throw new BadRequestException('This project already exist');

    return await this.projectRepository.save({
      createrId: userId,
      name: dto.name,
      alias: dto.alias,
    });
  }

  async findAll() {
    return await this.projectRepository.find();
  }

  async update(userId: number, dto: UpdateProjectDto) {
    const project = await this.projectRepository.findOne({
      where: {
        alias: dto.alias,
      },
    });
    if (!project) {
      throw new NotFoundException("This project doesn't exist");
    }
    if (project.createrId !== userId) {
      throw new NotFoundException('You do not have enough rights to delete');
    }
    return await this.projectRepository.update({ id: project.id }, dto);
  }

  async remove(id: number, userId: number) {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) {
      throw new NotFoundException("This project doesn't exist");
    }
    if (project.createrId !== userId) {
      throw new NotFoundException('You do not have enough rights to delete');
    }
    return this.projectRepository.softDelete(project);
  }
}
