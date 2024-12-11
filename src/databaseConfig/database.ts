import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { User } from '../entity/user.entity';
import { Project } from '../entity/project.entity';
import { UsersProject } from '../entity/usersProject.entity';

function getDbConfig(configService: ConfigService): PostgresConnectionOptions {
  return {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: +configService.get<number>('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    synchronize: false,
    entities: [
      User, 
      Project, 
      UsersProject
    ],
  };
}

export const DatabaseModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => getDbConfig(configService),
});
