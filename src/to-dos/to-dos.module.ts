import { Module } from '@nestjs/common';

import { ToDosService } from './services';
import { ToDosResolver } from './resolvers';

@Module({
  providers: [ToDosResolver, ToDosService],
})
export class ToDosModule {}
