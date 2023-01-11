import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthorService } from '../services/author.service';
import { Author } from '../entities/author.entity';
import { CreateAuthorInput } from '../dto/create-author.input';
import { UpdateAuthorInput } from '../dto/update-author.input';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Mutation(() => Author)
  async createAuthor(
    @Args('createAuthorInput') createAuthorInput: CreateAuthorInput,
  ) {
    return await this.authorService.create(createAuthorInput);
  }

  @Query(() => [Author], { name: 'authors' })
  async findAll() {
    return await this.authorService.findAll();
  }

  @Query(() => Author, { name: 'author' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.authorService.findOne(id);
  }

  @Mutation(() => Author)
  updateAuthor(
    @Args('updateAuthorInput') updateAuthorInput: UpdateAuthorInput,
  ) {
    return this.authorService.update(updateAuthorInput.id, updateAuthorInput);
  }

  @Mutation(() => Author)
  removeAuthor(@Args('id', { type: () => Int }) id: number) {
    return this.authorService.remove(id);
  }
}
