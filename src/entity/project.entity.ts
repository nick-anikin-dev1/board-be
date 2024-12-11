import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { UsersProject } from './usersProject.entity';
import { EntityModel } from './entity';

@Entity()
export class Project extends EntityModel {
  @Column({ nullable: false, unique: true })
  alias: string;

  @Column({ nullable: false })
  createrId: number;

  @ManyToMany(() => UsersProject)
  @JoinTable()
  usersId: UsersProject[];
}
