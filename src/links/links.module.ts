// src/links/links.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { UsersResolver } from '../users/users.resolver';
import { UsersLoader } from '../users/users.loader';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersResolver, UsersLoader],
  exports: [UsersService, UsersLoader],
})
export class UsersModule {}
