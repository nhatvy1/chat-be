import { Module } from '@nestjs/common';
import { CatModule } from '../CatModule/cat.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    CatModule,
    JwtModule.register({
      global: true,
      secret: 'AIR_BNB',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
