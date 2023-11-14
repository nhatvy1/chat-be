import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { AccessTokenStrategy } from 'src/strategy/access-token.strategy';
import { UserModule } from '../UserModule/user.module';
import { accessToken } from 'src/utils/constants';
import { RefreshTokenStrategy } from 'src/strategy/refresh-token.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: (): JwtModuleOptions => ({
        secret: accessToken.secret,
        signOptions: {
          expiresIn: accessToken.expiresIn,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
