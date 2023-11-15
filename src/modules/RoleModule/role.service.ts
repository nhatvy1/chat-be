import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role, RoleName } from './role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async initRole() {
    const user = this.roleRepository.create({ name: RoleName.User });
    const staff = this.roleRepository.create({ name: RoleName.Staff });
    const admin = this.roleRepository.create({ name: RoleName.Admin });

    await this.roleRepository.save([user, staff, admin]);
    return { msg: 'Success' };
  }

  findRoleByName(roleName: string): Promise<Role> {
    return this.roleRepository.findOneBy({
      name: roleName,
    });
  }
}
