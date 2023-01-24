import { Module } from '@nestjs/common';

import { ToDosService } from '@ToDos/services';
import { ToDosResolver } from '@ToDos/resolvers';

@Module({
  providers: [ToDosResolver, ToDosService],
})
export class ToDosModule {}
