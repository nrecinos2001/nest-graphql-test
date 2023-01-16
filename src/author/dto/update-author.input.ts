import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

import { CreateAuthorInput } from './';

@InputType()
export class UpdateAuthorInput extends PartialType(CreateAuthorInput) {
  @Field(() => Int)
  id: number;
}
