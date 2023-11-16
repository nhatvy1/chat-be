import { IsNotEmpty } from 'class-validator';
import { actionEnum } from 'src/enum/action.enum';
import { Role } from 'src/modules/RoleModule/role.entity';

export class PermissionDto {
  @IsNotEmpty()
  readonly subject: string;

  @IsNotEmpty()
  readonly action: actionEnum;

  @IsNotEmpty()
  role: Role;
}
