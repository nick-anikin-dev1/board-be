import {
  IsOptional,
  IsString,
  IsEnum,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Priority, Status, Type } from '../types';

export class FilterTaskDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Priority)
  @Transform(
    ({ value }) => (value ? value.split(',').map((item) => item.trim()) : []),
    { toClassOnly: true },
  )
  priorityIN?: string[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Priority)
  @Transform(
    ({ value }) => (value ? value.split(',').map((item) => item.trim()) : []),
    { toClassOnly: true },
  )
  priorityEX?: string[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Status)
  @Transform(
    ({ value }) => (value ? value.split(',').map((item) => item.trim()) : []),
    { toClassOnly: true },
  )
  statusIN?: string[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Status)
  @Transform(
    ({ value }) => (value ? value.split(',').map((item) => item.trim()) : []),
    { toClassOnly: true },
  )
  statusEX?: string[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Type)
  @Transform(
    ({ value }) => (value ? value.split(',').map((item) => item.trim()) : []),
    { toClassOnly: true },
  )
  typeIN?: string[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Type)
  @Transform(
    ({ value }) => (value ? value.split(',').map((item) => item.trim()) : []),
    { toClassOnly: true },
  )
  typeEX?: string[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString()
  @Transform(
    ({ value }) => (value ? value.split(',').map((item) => item.trim()) : []),
    { toClassOnly: true },
  )
  assigneeIN?: string[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString()
  @Transform(
    ({ value }) => (value ? value.split(',').map((item) => item.trim()) : []),
    { toClassOnly: true },
  )
  assigneeEX?: string[];

  @IsOptional()
  @IsString()
  storyPoints?: string;
}
