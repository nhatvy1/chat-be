import { actionEnum } from 'src/enum/action.enum';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../RoleModule/role.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: String })
  subject: string;

  @Column({ nullable: false, type: 'enum', enum: actionEnum })
  action: actionEnum;

  @ManyToMany(() => Role, (role) => role.permission, {
    onDelete: 'CASCADE',
  })
  role: Role[];
}
