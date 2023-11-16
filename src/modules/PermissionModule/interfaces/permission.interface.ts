import { actionEnum } from 'src/enum/action.enum';
import { Role } from 'src/modules/RoleModule/role.entity';

export interface PermissionParam {
  subject: string;
  action: actionEnum;
  role: Role;
}
