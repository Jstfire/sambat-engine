// src/users/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Link } from '../links/link.entity';
import { Sambatan } from '../sambatan/sambatan.entity';

@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  bio_user: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  photo_profile_url: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  photo_banner_url: string;

  @Field()
  @Column({ default: false })
  privated_acc: boolean;

  @Field()
  @Column({ default: true })
  is_active: boolean;

  @Field()
  @Column({ default: false })
  is_active_email: boolean;

  @Field(() => [Link])
  @OneToMany(() => Link, (link) => link.user)
  linker: Link[];

  @Field(() => [Link])
  @OneToMany(() => Link, (link) => link.user_link)
  linking: Link[];

  @Field(() => [Sambatan])
  @OneToMany(() => Sambatan, (sambatan) => sambatan.user)
  sambatan_post: Sambatan[];

  @Field()
  @Column()
  joined_on: Date;

  @Column({ nullable: true })
  activationToken: string;
}
