import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from './entity/user.entity';
import { User1733296130519 } from '../migrations/User1733296130519';
import { Project } from './entity/project.entity';
import { UsersProject } from './entity/usersProject.entity';
import { Project1733819819921 } from '../migrations/Project1733819819921';
config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: +configService.get<number>('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  entities: [Project, UsersProject, User],
  migrations: [User1733296130519, Project1733819819921]
});
