import { EntityModel } from './entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Board } from './board.entity';

@Entity()
export class Task extends EntityModel {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  creatorId: number;

  @Column({ nullable: false })
  priority: 'Low' | 'Medium' | 'High';

  @Column({ nullable: false })
  boardId: number;

  @ManyToOne(() => Board, (board) => board.tasks)
  @JoinColumn({ name: 'boardId' })
  board: Board;

  @Column({ nullable: false })
  status: 'Backlog' | 'New' | 'ToDo' | 'In progress' | 'Done';

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  assignee: string;

  @Column({ nullable: true })
  storyPoints: number;

  @Column({ nullable: true, type: 'bigint' })
  rating: number;

  @Column({ nullable: true })
  type: 'Epic' | 'Story' | 'Task';
}
