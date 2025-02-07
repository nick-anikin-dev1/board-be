import {
  IsOptional,
  IsString,
  IsEnum,
  IsArray,
  IsNumberString,
} from 'class-validator';
import { Priority, Status, Type } from '../types';

export class FilterTaskDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(Priority)
  priorityIN?: string[];

  @IsOptional()
  @IsEnum(Priority)
  priorityEX?: string[];

  @IsOptional()
  @IsEnum(Status)
  statusIN?: string[];

  @IsOptional()
  @IsEnum(Status)
  statusEX?: string[];

  @IsOptional()
  @IsEnum(Type)
  typeIN?: string[];

  @IsOptional()
  @IsEnum(Type)
  typeEX?: string[];

  @IsOptional()
  @IsArray()
  @IsString()
  assigneeIN?: string[];

  @IsOptional()
  @IsArray()
  @IsString()
  assigneeEX?: string[];

  @IsOptional()
  @IsNumberString()
  storyPoints?: string;
}
