import { Module } from '@nestjs/common';
import { UserModule } from './modules/UserModule/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from './config/typeorm.config';
import { AuthModule } from './modules/AuthModule/auth.module';
import { RoleModule } from './modules/RoleModule/role.module';
import { PermissionModule } from './modules/PermissionModule/permission.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({ useFactory: typeormConfig }),
    UserModule,
    AuthModule,
    RoleModule,
    PermissionModule,
  ],
  providers: [],
})
export class AppModule {}
