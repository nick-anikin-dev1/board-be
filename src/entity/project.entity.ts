import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { EntityModel } from './entity';
import { User } from './user.entity';
import { Board } from './board.entity';

@Entity()
export class Project extends EntityModel {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  alias: string;

  @Column({ nullable: false })
  creatorId: number;

  @OneToMany(() => Board, (board) => board.project)
  @JoinColumn({ name: 'projectId' })
  boards: Board[];

  @ManyToOne(() => User, (user) => user.ownProjects)
  @JoinColumn({ name: 'creatorId' })
  creator: User;

  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable({ name: 'users_projects' })
  users: User[];
}