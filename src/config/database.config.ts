// src/config/database.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'sambat_engine',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, // Hanya gunakan true untuk development
};
