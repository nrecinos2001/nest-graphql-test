import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoggedAuthorOutput {
  @Field(() => String, { description: 'Generated access_token of the user' })
  access_token: string;
}
