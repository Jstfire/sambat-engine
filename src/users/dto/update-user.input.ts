// src/users/dto/update-user.input.ts
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field({ nullable: true })
  privated_acc?: boolean;

  @Field({ nullable: true })
  is_active?: boolean;
}
