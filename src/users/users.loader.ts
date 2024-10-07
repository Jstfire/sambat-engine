// src/users/users.loader.ts
import DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class UsersLoader {
  constructor(private usersService: UsersService) {}

  public readonly batchUsers = new DataLoader(async (userIds: number[]) => {
    const users = await this.usersService.findByIds(userIds);
    const usersMap = new Map(users.map((user) => [user.id, user]));
    return userIds.map((userId) => usersMap.get(userId));
  });
}
