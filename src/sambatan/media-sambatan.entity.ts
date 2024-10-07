// src/sambatan/media-sambatan.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Sambatan } from './sambatan.entity';

@ObjectType()
@Entity('media_sambatan')
export class MediaSambatan {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  media_url: string;

  @Field()
  @Column()
  typeof_media: string;

  @Field(() => Sambatan)
  @ManyToOne(() => Sambatan, (sambatan) => sambatan.media_places)
  sambatan: Sambatan;
}
