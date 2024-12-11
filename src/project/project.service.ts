import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entity/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>
  ) {}
 
  async create(dto: CreateProjectDto) {
    const existProject = await this.projectRepository.findOne({
      where: {
        name: dto.name,
        alias: dto.alias,
      },
    });
    if (existProject) throw new BadRequestException('This project alredy exist');
    
    return await this.projectRepository.save({
      name: dto.name,
      alias: dto.alias, 
      createrId: dto.createrId
    });
  }

  async findAll() {
    return await this.projectRepository.find();
  }

  async findOne(id: number) {
    return await this.projectRepository.findOneBy({id});
  }

  async update(id: number, dto: UpdateProjectDto) {
    const project = await this.projectRepository.findOneBy({id});
    if (project) {
      project.name = dto.name,
      project.alias = dto.alias;
      project.createrId = dto.createrId
      project.updatedAt = new Date();
      return await this.projectRepository.save(project);
    }
    throw new BadRequestException('This project doesn\'t exist');
  }

  async remove(id: number) {
    const project = await this.projectRepository.findOneBy({id})
    if (project) {
      project.deletedAt = new Date()
      return this.projectRepository.save(project);
    }
    throw new BadRequestException('This project doesn\'t exist');
  }
}
