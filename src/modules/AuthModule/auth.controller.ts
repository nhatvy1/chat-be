import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { Response } from 'src/utils/response.type';
import { User } from '../UserModule/user.entity';

export type UserExcludePassword = Omit<User, 'password'>;
@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<any> {
    console.log('Check signup: ', signUpDto)
    const result = await this.authservice.signUp(signUpDto);
    return Response({
      status: HttpStatus.OK,
      message: 'Success',
      result,
    });
  }
}
