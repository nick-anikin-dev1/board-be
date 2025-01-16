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
import { IUser } from '../types/types';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(dto: CreateProjectDto, user: IUser) {
    const existProject = await this.projectRepository.findOne({
      where: {
        alias: dto.alias,
      },
    });
    if (existProject) {
      throw new BadRequestException('This project already exist');
    }
    return await this.projectRepository.save({
      creatorId: user.id,
      name: dto.name,
      alias: dto.alias,
    });
  }

  async findAll() {
    return await this.projectRepository.find({
      relations: ['creator'],
    });
  }

  async update(projectId: number, user: IUser, dto: UpdateProjectDto) {
    const project = await this.projectRepository.findOneBy({ id: projectId });
    this.checkIsOwnerAndIsExist(user.id, project);
    return await this.projectRepository.update({ id: project.id }, dto);
  }

  async remove(id: number, user: IUser) {
    const project = await this.projectRepository.findOneBy({ id });
    this.checkIsOwnerAndIsExist(user.id, project);
    return this.projectRepository.softDelete(project.id);
  }

  async checkIsOwnerAndIsExist(userId: number, spreadsheet: Project) {
    if (!spreadsheet) {
      throw new NotFoundException("This project doesn't exist");
    }
    if (spreadsheet.creatorId !== userId) {
      throw new ForbiddenException('You do not have enough rights');
    }
    return true;
  }

  async findOneBy(options: FindOneOptions) {
    return await this.projectRepository.findOne(options);
  }
}
