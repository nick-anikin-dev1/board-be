import { EntityModel } from './entity';
import { Entity, Column, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { Board } from './board.entity';
import { User } from './user.entity';
import { Priority, Status, Type } from 'src/task/types';

@Entity()
export class Task extends EntityModel {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  creatorId: number;

  @Column({ nullable: false, type: 'enum', enum: Priority, default: Priority.Medium })
  priority: string;

  @Column({ nullable: false })
  boardId: number;

  @ManyToOne(() => Board, (board) => board.tasks)
  @JoinColumn({ name: 'boardId' })
  board: Board;

  @Column({ nullable: false, type: 'enum', enum: Status, default: Status.Backlog })
  status: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  assigneeId: number;

  @ManyToMany(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'assigneeId' })
  assignee: User[];

  @Column({ nullable: true })
  storyPoints: number;

  @Column({ nullable: true, type: 'bigint' })
  rating: number;

  @Column({ nullable: true, type: 'enum', enum: Type })
  type: string;
}