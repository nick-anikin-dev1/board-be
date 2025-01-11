import { EntityModel } from './entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Board } from './board.entity';
import { User } from './user.entity';

enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

enum Status {
  Backlog = 'Backlog',
  New = 'New',
  ToDo = 'ToDo',
  InProgress = 'In progress',
  Done = 'Done',
}

enum TaskType {
  Epic = 'Epic',
  Story = 'Story',
  Task = 'Task',
}

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

  @Column('varchar', { nullable: true, array: true })
  assignee: User[];

  @Column({ nullable: true })
  storyPoints: number;

  @Column({ nullable: true, type: 'bigint' })
  rating: number;

  @Column({ nullable: true, type: 'enum', enum: TaskType })
  type: string;
}