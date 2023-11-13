import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Cat } from '../CatModule/cat.service';
import { AuthGuard } from '../../guards/auth.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('login')
  signIn(@Body() body: Cat) {
    return this.authservice.signIn(body.name, body.password);
  }
}
