import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { User } from 'src/entity/user.entity';
import { Priority, Status, Type } from '../types';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsNotEmpty()
  @MinLength(4)
  name: string;

  @IsEnum(Priority)
  priority: Priority;

  @IsEnum(Status)
  status: Status;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  assignee: User[];

  @IsOptional()
  storyPoints: number;

  @IsOptional()
  estimate: number;

  @IsEnum(Type)
  type: Type;
}