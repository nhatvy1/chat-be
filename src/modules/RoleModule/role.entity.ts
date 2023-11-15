import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
    default:
      'https://res.cloudinary.com/metavere/image/upload/v1695267123/ConBo_eij0q0.png',
  })
  avatar: string;

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
}
