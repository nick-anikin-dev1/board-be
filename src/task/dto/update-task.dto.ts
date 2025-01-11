import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { User } from 'src/entity/user.entity';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsNotEmpty()
  @MinLength(4)
  name: string;

  @IsNotEmpty()
  priority: string;

  @IsInt()
  @IsNotEmpty()
  boardId: number;

  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  assignee: User[];

  @IsOptional()
  storyPoints: number;

  @IsOptional()
  rating: number;

  @IsOptional()
  type: string;
}
