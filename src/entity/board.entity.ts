import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { EntityModel } from './entity';
import { Project } from './project.entity';

@Entity()
export class Board extends EntityModel {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false})
  creatorId: string;

  @Column({ nullable: false })
  projectId: number;

  @OneToMany(() => Project, (project) => project.board)
  ownProjects: Project[];
}
