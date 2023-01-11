import { Module } from '@nestjs/common';
import { AuthorService } from './services/author.service';
import { AuthorResolver } from './resolvers/author.resolver';

@Module({
  providers: [AuthorResolver, AuthorService]
})
export class AuthorModule { }
