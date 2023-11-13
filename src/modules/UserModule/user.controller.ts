import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'src/common/type.response';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  async findAll() {
    const result = await this.userService.findAll();
    return Response({
      statusCode: HttpStatus.OK,
      message: 'Find all user success.',
      result,
    });
  }
}
