import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permission } from '../PermissionModule/permission.entity';

export enum RoleName {
  User = 'user',
  Admin = 'admin',
  Staff = 'staff',
}

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: String,
    enum: RoleName,
    nullable: false,
    unique: true,
    default: RoleName.User,
  })
  name: string;

  @Column({ type: String, nullable: true })
  slug: string;

  @ManyToMany(() => Permission, (permission) => permission.role, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'role_permission' })
  permission: Permission[];
}
