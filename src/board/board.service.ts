import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { IUser } from '../types/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../entity/board.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
  ) {}

  async create(dto: CreateBoardDto, user: IUser) {
    const project = await this.projectService.findOneBy({ where: { id: dto.projectId } });
    if (!project) {
      throw new NotFoundException("This project doesn't exist");
    }
    this.isOwner(project.creatorId, user.id);
    return await this.boardRepository.save({
      name: dto.name,
      creatorId: user.id,
      projectId: project.id,
    });
  }

  async findAll() {
    return await this.boardRepository.find({
      relations: ['project'],
    });
  }

  async update(id: number, dto: UpdateBoardDto, user: IUser) {
    const board = await this.boardRepository.findOneBy({ id });
    if (!board) {
      throw new NotFoundException("This board doesn't exist");
    }
    this.isOwner(board.creatorId, user.id);
    return await this.boardRepository.update({ id: board.id }, dto);
  }

  async remove(id: number, user: IUser) {
    const board = await this.boardRepository.findOneBy({ id });
    if (!board) {
      throw new NotFoundException("This board doesn't exist");
    }
    this.isOwner(board.creatorId, user.id);
    return this.boardRepository.softDelete(board);
  }

  async isOwner(creatorId: number, userId: number) {
    if (creatorId !== userId) {
      throw new ForbiddenException('You do not have enough rights');
    }
    return true;
  }
}
