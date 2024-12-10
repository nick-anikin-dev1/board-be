import { Entity, ManyToMany } from 'typeorm';
import { Project } from './project.entity';
import { EntityModel } from './entity';

@Entity()
export class UsersProject extends EntityModel {
  @ManyToMany(() => Project)
  projectId: Project[];
}
