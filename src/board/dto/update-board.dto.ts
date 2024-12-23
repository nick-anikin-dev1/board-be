import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @IsOptional()
  @IsString()
  @MinLength(4)
  newName: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  oldName: string;
}
