import { Module } from '@nestjs/common';
import { UserModule } from './modules/UserModule/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import typeormConfig from './config/typeorm.config';
import { AuthModule } from './modules/AuthModule/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({ useFactory: typeormConfig }),
    UserModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
