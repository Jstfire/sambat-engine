// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { Link } from 'src/links/link.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = this.usersRepository.create(createUserInput);
    return this.usersRepository.save(user);
  }

  // Implementasikan method lainnya
  async followUser(followerId: number, followedId: number): Promise<boolean> {
    const follower = await this.usersRepository.findOne(followerId);
    const followed = await this.usersRepository.findOne(followedId);

    if (!follower || !followed) {
      throw new Error('User not found');
    }

    const link = new Link();
    link.user = follower;
    link.user_link = followed;

    await this.linkRepository.save(link);
    return true;
  }

  async getFollowers(userId: number): Promise<User[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['linker'],
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user.linker.map((link) => link.user);
  }

  async getFollowing(userId: number): Promise<User[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['linking'],
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user.linking.map((link) => link.user_link);
  }

  async sendActivationEmail(userId: number): Promise<void> {
    const user = await this.usersRepository.findOne(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const activationToken = this.generateActivationToken();
    user.activationToken = activationToken;
    await this.usersRepository.save(user);

    // Kirim email aktivasi menggunakan nodemailer
    // Implementasi pengiriman email akan ditambahkan nanti
  }

  async activateAccount(activationToken: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: { activationToken },
    });
    if (!user) {
      throw new Error('Invalid activation token');
    }

    user.is_active_email = true;
    user.activationToken = null;
    await this.usersRepository.save(user);

    return true;
  }

  async updateProfile(
    userId: number,
    updateData: UpdateUserInput,
  ): Promise<User> {
    const user = await this.usersRepository.findOne(userId);
    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, updateData);
    return this.usersRepository.save(user);
  }
}
