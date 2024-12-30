import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { EntityModel } from './entity';
import { Project } from './project.entity';
import { Task } from './task.entity';

@Entity()
export class Board extends EntityModel {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  creatorId: number;

  @Column({ nullable: false })
  projectId: number;

  @ManyToOne(() => Project, (project) => project.boards)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @OneToMany(() => Task, (task) => task.board)
  @JoinColumn({ name: 'boardId' })
  tasks: Task[];
}
