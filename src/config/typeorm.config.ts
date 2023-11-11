import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/modules/UserModule/user.entity';

export default (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [User],
  autoLoadEntities: true,
  synchronize: true,
});
