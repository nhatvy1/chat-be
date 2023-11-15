import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { Response } from 'src/utils/response.type';
import { User } from '../UserModule/user.entity';
import { SignInDto } from './dto/sign-in.dto';
import { JwtRefreshGuard } from 'src/guards/jwt-auth-refresh';
import { GetCurrentUser } from 'src/decorators/auth.user.decorator';
import { TokenVerify } from './interfaces/token.interface';

export type UserExcludePassword = Omit<User, 'password'>;
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    const result = await this.authService.signUp(signUpDto);
    return Response({
      statusCode: HttpStatus.OK,
      message: 'Success',
      result,
    });
  }

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    const result = await this.authService.signIn(signInDto);
    return Response({ statusCode: HttpStatus.OK, message: 'Success', result });
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh-token')
  refreshToken(
    @GetCurrentUser('refreshToken')
    tokenVerify: TokenVerify,
  ) {
    return this.authService.refreshToken(tokenVerify);
  }
}
