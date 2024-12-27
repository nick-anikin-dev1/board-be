import { IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateBoardDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  projectId: number;
  
  @IsString()
  @MinLength(4)
  name: string;
}
