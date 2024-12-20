import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/types/user.types';
import { IUser } from 'src/types/types';

@Controller('board')
@UseGuards(JwtAuthGuard)
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post('create')
  create(@Body() dto: CreateBoardDto, @User() user: IUser) {
    return this.boardService.create(dto, user);
  }

  @Get('find')
  findAll() {
    return this.boardService.findAll();
  }

  @Patch('update')
  update(@Body() dto: UpdateBoardDto, @User() user: IUser) {
    return this.boardService.update(dto, user);
  }

  @Delete('delete')
  remove(@Param('id') id: string) {
    return this.boardService.remove(+id);
  }
}
