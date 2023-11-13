import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Response } from 'src/utils/response.type';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  async findAll() {
    const result = await this.userService.findAll();
    return Response({
      status: HttpStatus.OK,
      message: 'Find all user success.',
      result,
    });
  }
}
