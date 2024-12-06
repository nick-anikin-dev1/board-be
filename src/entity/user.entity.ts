import { EntityModel } from './entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class User extends EntityModel {
  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ select: false })
  password: string;
}
