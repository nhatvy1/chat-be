import { Controller, Get } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get('init-role')
  initRole() {
    return this.roleService.initRole();
  }
}
