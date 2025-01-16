import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entity/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [],
  providers: [],
  exports: [],
})
export class TaskModule {}
