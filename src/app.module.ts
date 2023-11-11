import { Module } from '@nestjs/common';
import { UserModule } from './modules/UserModule/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import typeormConfig from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({ useFactory: typeormConfig }),
    UserModule,
  ],
  providers: [],
})
export class AppModule {}
