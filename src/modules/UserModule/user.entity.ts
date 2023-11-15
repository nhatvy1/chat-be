import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from '../RoleModule/role.entity';

export enum Status {
  ACTIVE = 1,
  INACTIVE = 0,
  BLOCK = -1,
}

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: String })
  fullName: string;

  @Column({
    type: String,
    default:
      'https://res.cloudinary.com/metavere/image/upload/v1695267123/ConBo_eij0q0.png',
  })
  avatar: string;

  @Column({ type: String, nullable: false, unique: true })
  email: string;

  @Column({ type: String, nullable: false })
  // @Column({ type: String, nullable: false, select: false })
  password: string;

  @Column({ type: String, nullable: false, unique: true })
  phone: string;

  @Column({ type: Number, enum: Status, default: Status.ACTIVE })
  status: number;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn({ name: 'role' })
  role: Role;
}
