// src/sambatan/dto/create-sambatan.input.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class CreateSambatanInput {
  @Field()
  @IsNotEmpty()
  @MaxLength(280)
  content: string;

  @Field(() => [String], { nullable: true })
  mediaUrls?: string[];

  @Field({ nullable: true })
  quoted_sambatan_id?: number;
}
