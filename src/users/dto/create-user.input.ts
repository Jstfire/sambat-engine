// src/users/dto/create-user.input.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  bio_user?: string;

  @Field({ nullable: true })
  photo_profile_url?: string;

  @Field({ nullable: true })
  photo_banner_url?: string;
}
