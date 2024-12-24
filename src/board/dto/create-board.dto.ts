import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  projectId: number;
  
  @IsNotEmpty()
  @MinLength(4)
  name: string;
}
