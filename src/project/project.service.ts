import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entity/project.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>
  ) {}
 
  async create(dto: CreateProjectDto, userId: number) {
    const existProject = await this.projectRepository.findOne({
      where: {
        alias: dto.alias,
      },
    });
    if (existProject) throw new BadRequestException('This project alredy exist');
    
    return await this.projectRepository.save({
      name: dto.name,
      alias: dto.alias, 
      createrId: userId,
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
    if (!project) {
      throw new NotFoundException('This project doesn\'t exist');
    }
    return await this.projectRepository.save({...project});
  }

  async remove(id: number) {
    const project = await this.projectRepository.findOneBy({id})
    if (!project) {
      throw new NotFoundException('This project doesn\'t exist');
    }
    return this.projectRepository.softDelete(project);
  }
}
