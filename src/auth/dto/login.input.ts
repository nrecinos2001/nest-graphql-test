import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field(() => String, { description: "User's username" })
  username: string;

  @Field(() => String, { description: "User's password" })
  password: string;
}
