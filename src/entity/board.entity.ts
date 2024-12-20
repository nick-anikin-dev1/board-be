import { Entity, Column, ManyToOne } from 'typeorm';
import { EntityModel } from './entity';
import { Project } from './project.entity';

@Entity()
export class Board extends EntityModel {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  creatorId: number;

  @Column({ nullable: false })
  projectId: number;

  @ManyToOne(() => Project, (project) => project.boards)
  project: Project;
}