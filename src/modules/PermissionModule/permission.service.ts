import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { Repository } from 'typeorm';
import { PermissionDto } from './dto/permission.dto';
import { PermissionParam } from './interfaces/permission.interface';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async addPermission({ subject, action, role }: PermissionParam) {}
}
