// import { DataSource } from 'typeorm';
// import { ConfigService } from '@nestjs/config';
// import { config } from 'dotenv';
// import { User } from './entity/user.entity';
// import { Project } from './entity/project.entity';

// config();

// const configService = new ConfigService();

// export default new DataSource({
//   type: 'postgres',
//   host: configService.get('DB_HOST'),
//   port: +configService.get<number>('DB_PORT'),
//   username: configService.get('DB_USERNAME'),
//   password: configService.get('DB_PASSWORD'),
//   entities: [Project, User],

  
// });
