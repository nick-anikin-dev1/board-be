import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RoleType } from '../task/types';
import { UserRole } from './userRole.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: RoleType })
  type: RoleType;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];
}
