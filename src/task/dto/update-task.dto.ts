import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { User } from 'src/entity/user.entity';
import { Priority, Status, Type } from '../types';
import { IsMultiplesOf } from 'src/decorators/isMultiplesOf';

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

  @IsInt()
  @Min(60)
  @IsMultiplesOf(60)
  estimate: number;

  @IsEnum(Type)
  type: Type;
}
