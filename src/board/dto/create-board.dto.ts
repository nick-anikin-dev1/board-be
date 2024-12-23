import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @MinLength(4)
  name: string;
}
