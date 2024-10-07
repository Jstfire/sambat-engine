// src/links/link.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../users/user.entity';

@ObjectType()
@Entity('links')
export class Link {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.linking)
  user_link: User;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.linker)
  user: User;
}
