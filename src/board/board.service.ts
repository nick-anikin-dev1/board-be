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
    const existUser = await this.existUser(user);
    const creatorProjectId = existUser.ownProjects[0].creatorId;
    const projectId = existUser.ownProjects[0].id;
    if (!creatorProjectId) {
      throw new NotFoundException('User does not have a project');
    }
    return await this.boardRepository.save({
      name: dto.name,
      creatorId: user.id,
      projectId,
    });
  }

  async findAll() {
    return await this.boardRepository.find({
      relations: ['boards'],
    });
  }

  async update(dto: UpdateBoardDto, user: IUser) {
    const existUser = await this.existUser(user);
    const project = await this.projectService.findOneBy({
      where: {
        alias: existUser.ownProjects[0].alias,
      },
      relations: ['boards'],
    });
    if (!project.boards[0]) {
      throw new NotFoundException("This user doesn't have boards");
    }
    const renameBoard = await this.boardRepository.save(
      project.boards.filter((board) => {
        if (board.name === dto.oldName) return (board.name = dto.newName);
      }),
    );
    if (!renameBoard[0]) {
      throw new NotFoundException('There are no boards with this name');
    }
    return renameBoard;
  }

  async remove(id: number, user: IUser) {
    const board = await this.boardRepository.findOneBy({ id });
    if (!board) {
      throw new NotFoundException("This board doesn't exist");
    }
    this.isOwner(board.creatorId, user.id);
    return this.boardRepository.softDelete(board);
  }

  async existUser(user: IUser) {
    return await this.userService.findOneBy({
      where: {
        id: user.id,
      },
      relations: ['ownProjects'],
    });
  }

  async isOwner(creatorId: number, userId: number) {
    if (creatorId !== userId) {
      throw new ForbiddenException('You do not have enough rights');
    }
    return true;
  }
}
