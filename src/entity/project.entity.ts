import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { UsersProject } from './usersProject.entity';
import { EntityModel } from './entity';

@Entity()
export class Project extends EntityModel {
  @Column({ nullable: false })
  alias: string;

  @Column({ unique: true, nullable: false })
  createrId: string;

  @ManyToMany(() => UsersProject)
  @JoinTable()
  usersId: UsersProject[]
}
