import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { User } from '../types/user.types';
import { IUser } from '../types/types';

@Controller('board')
@UseGuards(JwtAuthGuard)
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  create(
    @Body() dto: CreateBoardDto,
    @User() user: IUser,
  ) {
    return this.boardService.create(dto, user);
  }

  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateBoardDto,
    @User() user: IUser,
  ) {
    return this.boardService.update(+id, dto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.boardService.remove(+id, user);
  }
}
