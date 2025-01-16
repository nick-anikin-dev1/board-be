import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { User } from '../../entity/user.entity';
import { Priority, Status, Type } from '../types';

export class CreateTaskDto {
  @IsNotEmpty()
  @MinLength(4)
  name: string;

  @IsEnum(Priority)
  priority: Priority;

  @IsInt()
  @IsNotEmpty()
  boardId: number;

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
