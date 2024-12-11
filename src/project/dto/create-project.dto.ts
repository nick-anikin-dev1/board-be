import { IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  alias: string;
 
  @IsNotEmpty()
  createrId: number;
}