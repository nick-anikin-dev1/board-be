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
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly boardService: BoardService,
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
    private mailerService: MailerService,
  ) {}

  async create(dto: CreateTaskDto, user: IUser) {
    const board = await this.boardService.findOneBy({
      where: { id: dto.boardId },
    });
    const project = await this.projectService.findOneBy({
      where: { id: board.projectId },
    });
    const assignee = await this.userService.findOneBy({
      where: { id: dto.assigneeId },
    });
    this.checkIsOwnerAndIsExist(user.id, board);
    this.sendEmail(user, board, dto.name);
    return await this.taskRepository.save({
      name: dto.name,
      creatorId: user.id,
      priority: dto.priority,
      boardId: dto.boardId,
      status: dto.status,
      title: dto.title,
      assignee: assignee[0],
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

    async sendEmail(user: IUser, board: Board, taskName: string) {
    const { lastName, firstName } = user;
    const { name } = board;
    const emailSent = await this.mailerService.sendMail({
      to: user.email,
      from: 'board.notify@gmail.com',
      subject: 'Test email from NestJS!',
      template: 'confirmation', 
      context: {
        name,
        firstName,
        lastName,
        taskName
      },
    });
  }
}
