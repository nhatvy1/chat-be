import { Controller, Post, HttpStatus, Body } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionDto } from './dto/permission.dto';
import { Response } from 'src/utils/response.type';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}
}
