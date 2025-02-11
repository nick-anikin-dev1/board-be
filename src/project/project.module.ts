import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../entity/project.entity';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), UserModule],
  controllers: [ProjectController],
  providers: [ProjectService, RolesGuard],
  exports: [ProjectService],
})
export class ProjectModule {}
