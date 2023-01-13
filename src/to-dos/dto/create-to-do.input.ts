import { InputType, Int, Field } from '@nestjs/graphql';
import { Author } from 'src/author/entities';

@InputType()
export class CreateToDoInput {
  @Field(() => String, { description: "Todo's Title" })
  title: string;
}
