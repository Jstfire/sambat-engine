// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { LinkModule } from '../links/link.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), LinkModule],
  providers: [UsersService, UsersResolver, UsersLoader],
  exports: [UsersService, UsersLoader],
})
export class UsersModule {}
