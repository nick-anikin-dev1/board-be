import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { Priority, Status, Type } from '../types';
import { IsMultiplesOf } from 'src/decorators/isMultiplesOf';

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
  assigneeId: number;

  @IsOptional()
  storyPoints: number;

  @IsInt()
  @Min(60)
  @IsMultiplesOf(60)
  estimate: number;

  @IsEnum(Type)
  type: Type;
}
