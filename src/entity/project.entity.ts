import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { EntityModel } from './entity';
import { User } from './user.entity';

@Entity()
export class Project extends EntityModel {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  alias: string;

  @Column({ nullable: false })
  createrId: number;
  
  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable({ name: 'users_projects' })
  users: User[];
}
