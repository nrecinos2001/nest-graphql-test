import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ToDo } from "src/to-dos/entities";

@ObjectType()
export class AuthorOutput {
  @Field(() => Int, { description: 'id' })
  id: number;

  @Field(() => String, { description: 'Name of the user' })
  name: string;

  @Field(() => String, { description: 'Email of the user' })
  email: string;

  @Field(() => String, { description: 'User\'s username' })
  username: string;

  @Field(() => [ToDo], { description: 'User Todos' })
  todos: ToDo[];
}