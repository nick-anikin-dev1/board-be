import { EntityModel } from './entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Project } from './project.entity';

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

  @ManyToMany(() => Project, (project) => project.users)
  @JoinTable({ name: 'users_projects' })
  projects: Project[];
}
