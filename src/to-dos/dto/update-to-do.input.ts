import { CreateToDoInput } from './create-to-do.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateToDoInput extends PartialType(CreateToDoInput) {
  @Field(() => Int)
  id: number;

  @Field(() => Boolean)
  isCompleted?: boolean;
}
