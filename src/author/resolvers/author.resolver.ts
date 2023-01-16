import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthorService } from '../services/author.service';
import { User } from 'src/common/decorators';
import { Author } from '../entities/author.entity';
import { CreateAuthorInput } from '../dto/create-author.input';
import { UpdateAuthorInput } from '../dto/update-author.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AuthorPayload } from 'src/common/types';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Mutation(() => Author)
  async createAuthor(
    @Args('createAuthorInput') createAuthorInput: CreateAuthorInput,
  ) {
    return await this.authorService.create(createAuthorInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Author], { name: 'authors' })
  async findAll() {
    return await this.authorService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Author, { name: 'author' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.authorService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Author)
  async updateAuthor(
    @Args('updateAuthorInput') updateAuthorInput: UpdateAuthorInput,
    @User() authorPayload: AuthorPayload,
  ) {
    return await this.authorService.update(authorPayload, updateAuthorInput);
  }

  @Mutation(() => Author)
  removeAuthor(@Args('id', { type: () => Int }) id: number) {
    return this.authorService.remove(id);
  }
}
