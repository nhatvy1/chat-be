import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { AccessTokenStrategy } from 'src/strategy/access-token.strategy';
import { UserService } from '../UserModule/user.service';
import { UserModule } from '../UserModule/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: (): JwtModuleOptions=> ({
        secret: process.env.JWJWT_AIRBNB,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRES_IN
        }
      })
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy],
})
export class AuthModule {}
