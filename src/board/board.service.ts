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
import { ProjectService } from '../project/project.service';
import { Project } from '../entity/project.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    private readonly projectService: ProjectService,
  ) {}

  async create(dto: CreateBoardDto, user: IUser) {
    const project = await this.projectService.findOneBy({
      where: { id: dto.projectId },
    });
    this.checkIsOwnerAndIsExist(user.id, project);
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
    this.checkIsOwnerAndIsExist(user.id, board);
    return await this.boardRepository.update({ id: board.id }, dto);
  }

  async remove(id: number, user: IUser) {
    const board = await this.boardRepository.findOneBy({ id });
    this.checkIsOwnerAndIsExist(user.id, board);
    return this.boardRepository.softDelete(board.id);
  }

  async checkIsOwnerAndIsExist(
    userId: number,
    spreadsheet: Project | Board | undefined,
  ) {
    if (!spreadsheet) {
      throw new NotFoundException("This spreadsheet doesn't exist");
    }
    if (spreadsheet.creatorId !== userId) {
      throw new ForbiddenException('You do not have enough rights');
    }
    return true;
  }
}
