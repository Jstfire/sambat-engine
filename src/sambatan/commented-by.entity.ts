// src/sambatan/commented-by.entity.ts
import { Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Sambatan } from './sambatan.entity';

@ObjectType()
@Entity('commented_by')
export class CommentedBy {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Sambatan)
  @OneToOne(() => Sambatan)
  sambatan_comment: Sambatan;

  @Field(() => Sambatan)
  @ManyToOne(() => Sambatan, (sambatan) => sambatan.commented_by)
  sambatan: Sambatan;
}
