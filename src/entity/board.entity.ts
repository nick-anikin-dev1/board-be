<<<<<<< HEAD
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
=======
import { Entity, Column, ManyToOne } from 'typeorm';
>>>>>>> main
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
<<<<<<< HEAD
  @JoinColumn({ name: 'projectId' })
=======
>>>>>>> main
  project: Project;
}
