// src/sambatan/sambatan.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../users/user.entity';
import { MediaSambatan } from './media-sambatan.entity';
import { CommentedBy } from './commented-by.entity';
import { RepostedBy } from './reposted-by.entity';

@ObjectType()
@Entity('sambatan')
export class Sambatan {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  content: string;

  @Field()
  @Column({ default: 0 })
  up_vote: number;

  @Field()
  @Column({ default: 0 })
  down_vote: number;

  @Field()
  @Column({ default: 0 })
  views: number;

  @Field()
  @Column({ default: false })
  add_media: boolean;

  @Field(() => [MediaSambatan])
  @OneToMany(() => MediaSambatan, (mediaSambatan) => mediaSambatan.sambatan)
  media_places: MediaSambatan[];

  @Field(() => [CommentedBy])
  @OneToMany(() => CommentedBy, (commentedBy) => commentedBy.sambatan)
  commented_by: CommentedBy[];

  @Field(() => [RepostedBy])
  @OneToMany(() => RepostedBy, (repostedBy) => repostedBy.sambatan)
  reposted_by: RepostedBy[];

  @Field()
  @Column({ default: false })
  is_quoting: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  quoted_sambatan_id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.sambatan_post)
  user: User;

  @Field()
  @Column()
  created_at: Date;
}
