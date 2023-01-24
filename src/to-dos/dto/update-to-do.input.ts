import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

import { CreateToDoInput } from '@ToDos/dto';

@InputType()
export class UpdateToDoInput extends PartialType(CreateToDoInput) {
  @Field(() => Int)
  id: number;

  @Field(() => Boolean)
  isCompleted?: boolean;
}
