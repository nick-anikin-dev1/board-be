import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { IUser } from '../types/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../entity/board.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
     private readonly userService: UserService,
  ) {}

  async create(dto: CreateBoardDto, user: IUser) {
    const existUser = await this.userService.findOneBy({where: {
      id: user.id
    },
    relations: ['ownProjects']});
    const creatorProjectId = existUser.ownProjects[0].creatorId;
    const projectId = existUser.ownProjects[0].id;
    if (user.id !== creatorProjectId) {
      throw new ForbiddenException('You do not have enough rights to delete');
    }
    return await this.boardRepository.save({
      name: dto.name,
      creatorId: user.id,
      projectId
    });
  }

  async findAll() {
    return await this.boardRepository.find({
      relations: ['boards'],
    });
  }

  async update (dto: UpdateBoardDto, user: IUser) {
    return `This action updates a # board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
