import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entity/project.entity';
import { FindOneOptions, Repository } from 'typeorm';

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
      creatorId: userId,
      name: dto.name,
      alias: dto.alias,
    });
  }

  async findAll() {
    return await this.projectRepository.find({
      relations: ['creator'],
    });
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
<<<<<<< HEAD
    this.isOwner(project.creatorId, userId);
=======
    this.isOwner(project.creatorId, userId)
>>>>>>> main
    return await this.projectRepository.update({ id: project.id }, dto);
  }

  async remove(id: number, userId: number) {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) {
      throw new NotFoundException("This project doesn't exist");
    }
<<<<<<< HEAD
    this.isOwner(project.creatorId, userId);
    return this.projectRepository.softDelete(project);
  }

  async isOwner(creatorId: number, userId: number) {
=======
    this.isOwner(project.creatorId, userId)
    return this.projectRepository.softDelete(project);
  }

  async isOwner(creatorId, userId) {
>>>>>>> main
    if (creatorId !== userId) {
      throw new ForbiddenException('You do not have enough rights');
    }
    return true;
  }
<<<<<<< HEAD

  async findOneBy(options: FindOneOptions) {
    return await this.projectRepository.findOne(options);
  }
=======
>>>>>>> main
}
