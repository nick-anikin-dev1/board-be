import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateBoardDto {
  @IsInt()
  @IsNotEmpty()
  projectId: number;

  @IsString()
  @MinLength(4)
  name: string;
}
