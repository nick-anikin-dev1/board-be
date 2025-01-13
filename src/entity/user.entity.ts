import { EntityModel } from './entity';
import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Project } from './project.entity';
import { Task } from './task.entity';

@Entity()
export class User extends EntityModel {
  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Project, (project) => project.creator)
  ownProjects: Project[];

  @ManyToMany(() => Project, (project) => project.users)
  @JoinTable({ name: 'users_projects' })
  projects: Project[];

  @ManyToMany(() => Task, (task) => task.assignee)
  tasks: Task[];
}
