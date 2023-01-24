import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateToDoInput {
  @Field(() => String, { description: "Todo's Title" })
  title: string;
}
