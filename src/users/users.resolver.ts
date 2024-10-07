// src/users/users.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  // Implementasikan query dan mutation lainnya
  @Mutation(() => Boolean)
  async followUser(
    @Args('followerId') followerId: number,
    @Args('followedId') followedId: number,
  ): Promise<boolean> {
    return this.usersService.followUser(followerId, followedId);
  }

  @Query(() => [User])
  async getFollowers(@Args('userId') userId: number): Promise<User[]> {
    return this.usersService.getFollowers(userId);
  }

  @Query(() => [User])
  async getFollowing(@Args('userId') userId: number): Promise<User[]> {
    return this.usersService.getFollowing(userId);
  }

  @Mutation(() => Boolean)
  async sendActivationEmail(@Args('userId') userId: number): Promise<boolean> {
    await this.usersService.sendActivationEmail(userId);
    return true;
  }

  @Mutation(() => Boolean)
  async activateAccount(@Args('token') token: string): Promise<boolean> {
    return this.usersService.activateAccount(token);
  }

  @Mutation(() => User)
  async updateProfile(
    @Args('userId') userId: number,
    @Args('updateData') updateData: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.updateProfile(userId, updateData);
  }
}
