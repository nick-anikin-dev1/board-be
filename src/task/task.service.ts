import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '../entity/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardService } from '../board/board.service';
import { Board } from '../entity/board.entity';
import { IUser } from '../types/types';
import { ProjectService } from 'src/project/project.service';
import { UserService } from 'src/user/user.service';
import { FilterTaskDto } from './dto/filter-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly boardService: BoardService,
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
  ) {}

  async create(dto: CreateTaskDto, user: IUser) {
    const board = await this.boardService.findOneBy({
      where: { id: dto.boardId },
    });
    const project = await this.projectService.findOneBy({
      where: { id: board.projectId },
    });
    console.log(project.users);
    this.checkIsOwnerAndIsExist(user.id, board);
    return await this.taskRepository.save({
      name: dto.name,
      creatorId: user.id,
      priority: dto.priority,
      boardId: dto.boardId,
      status: dto.status,
      title: dto.title,
      assigneeId: dto.assigneeId,
      storyPoints: dto.storyPoints,
      rating: dto.estimate,
      type: dto.type,
    });
  }

  async findOne(id: number) {
    return await this.boardService.findOneBy({
      where: { id },
    });
  }

  async update(id: number, dto: UpdateTaskDto, user: IUser) {
    const task = await this.taskRepository.findOneBy({ id });
    this.checkIsOwnerAndIsExist(user.id, task);
    return await this.taskRepository.update({ id: task.id }, dto);
  }

  async remove(id: number, user: IUser) {
    const task = await this.taskRepository.findOneBy({ id });
    this.checkIsOwnerAndIsExist(user.id, task);
    return this.taskRepository.softDelete(task);
  }

  async checkIsOwnerAndIsExist(userId: number, spreadsheet: Board | Task) {
    if (!spreadsheet) {
      throw new NotFoundException("This spreadsheet doesn't exist");
    }
    if (spreadsheet.creatorId !== userId) {
      throw new ForbiddenException('You do not have enough rights');
    }
    return true;
  }

  async findTasks(dto: FilterTaskDto) {
    const queryBuilder = this.taskRepository.createQueryBuilder('task');

    if (dto.search) {
      queryBuilder.andWhere(
        '(LOWER(task.name) LIKE LOWER(:search) OR LOWER(task.type) LIKE LOWER(:search) OR LOWER(task.status) LIKE LOWER(:search))',
        { search: `%${dto.search}%` },
      );
    }

    if (dto.priorityIN) {
      queryBuilder.andWhere('task.priority IN (:...priorities)', {
        priorities: dto.priorityIN,
      });
    }

    if (dto.priorityEX) {
      queryBuilder.andWhere('task.priority NOT IN (:...priorities)', {
        priorities: dto.priorityEX,
      });
    }

    if (dto.statusIN) {
      queryBuilder.andWhere('task.status IN (:...statuses)', {
        statuses: dto.statusIN,
      });
    }

    if (dto.statusEX) {
      queryBuilder.andWhere('task.status NOT IN (:...statuses)', {
        statuses: dto.statusEX,
      });
    }

    if (dto.typeIN) {
      queryBuilder.andWhere('task.type IN (:...types)', {
        types: dto.typeIN,
      });
    }

    if (dto.typeEX) {
      queryBuilder.andWhere('task.type NOT IN (:...types)', {
        types: dto.typeEX,
      });
    }

    if (dto.assigneeIN) {
      queryBuilder.andWhere('task.assigneeEmail IN (:...assignees)', {
        assignees: dto.assigneeIN,
      });
    }

    if (dto.assigneeEX) {
      queryBuilder.andWhere('task.assigneeEmail NOT IN (:...assignees)', {
        assignees: dto.assigneeEX,
      });
    }

    if (dto.storyPoints) {
      const [minPoints, maxPoints] = dto.storyPoints.split('-').map(Number);
      queryBuilder.andWhere(
        'task.storyPoints BETWEEN :minPoints AND :maxPoints',
        {
          minPoints,
          maxPoints,
        },
      );
    }

    return queryBuilder.getMany();
  }
}
