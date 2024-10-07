// src/sambatan/reposted-by.entity.ts
import { Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../users/user.entity';
import { Sambatan } from './sambatan.entity';

@ObjectType()
@Entity('reposted_by')
export class RepostedBy {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @OneToOne(() => User)
  user_reposted: User;

  @Field(() => Sambatan)
  @ManyToOne(() => Sambatan, (sambatan) => sambatan.reposted_by)
  sambatan: Sambatan;
}
