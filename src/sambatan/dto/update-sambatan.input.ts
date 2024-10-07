// src/sambatan/dto/update-sambatan.input.ts
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateSambatanInput } from './create-sambatan.input';

@InputType()
export class UpdateSambatanInput extends PartialType(CreateSambatanInput) {
  @Field({ nullable: true })
  up_vote?: number;

  @Field({ nullable: true })
  down_vote?: number;

  @Field({ nullable: true })
  views?: number;
}
