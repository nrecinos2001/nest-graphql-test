import { Module } from '@nestjs/common';

import { AuthorService } from './services';
import { AuthorResolver } from './resolvers';

@Module({
  providers: [AuthorResolver, AuthorService],
  exports: [AuthorService],
})
export class AuthorModule {}
