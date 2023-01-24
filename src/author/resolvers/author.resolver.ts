import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthorService } from '../services';
import { Author } from '../entities';
import { User } from 'src/common/decorators';
import { JwtAuthGuard } from 'src/common/guards';
import { AuthorPayload } from 'src/common/types';
import {
  AuthorOutput,
  CreateAuthorInput,
  UpdateAuthorInput,
} from 'src/author/dto';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Mutation(() => AuthorOutput)
  async createAuthor(
    @Args('createAuthorInput') createAuthorInput: CreateAuthorInput,
  ) {
    return await this.authorService.create(createAuthorInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [AuthorOutput], { name: 'authors' })
  async findAll() {
    return await this.authorService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Author, { name: 'author' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.authorService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => AuthorOutput)
  async updateAuthor(
    @Args('updateAuthorInput') updateAuthorInput: UpdateAuthorInput,
    @User() authorPayload: AuthorPayload,
  ) {
    return await this.authorService.update(authorPayload, updateAuthorInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => AuthorOutput, { nullable: true })
  async removeAuthor(
    @Args('id', { type: () => Int }) id: number,
    @User() authorPayload: AuthorPayload,
  ): Promise<null> {
    return this.authorService.remove(id, authorPayload);
  }
}
