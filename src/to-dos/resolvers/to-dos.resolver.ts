import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { ToDosService } from '../services';
import { ToDo } from '../entities';
import { CreateToDoInput, UpdateToDoInput } from '../dto';
import { User } from 'src/common/decorators';
import { AuthorPayload } from 'src/common/types';
import { JwtAuthGuard } from 'src/common/guards';

@Resolver(() => ToDo)
export class ToDosResolver {
  constructor(private readonly toDosService: ToDosService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ToDo)
  async createToDo(
    @Args('createToDoInput') createToDoInput: CreateToDoInput,
    @User() authorPayload: AuthorPayload,
  ) {
    return await this.toDosService.create(createToDoInput, authorPayload);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [ToDo], { name: 'toDos' })
  async findAll() {
    return await this.toDosService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => ToDo, { name: 'toDo' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.toDosService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ToDo)
  async updateToDo(
    @Args('updateToDoInput') updateToDoInput: UpdateToDoInput,
    @User() authorPayload: AuthorPayload,
  ) {
    return this.toDosService.update(authorPayload, updateToDoInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ToDo, { nullable: true })
  async removeToDo(
    @Args('id', { type: () => Int }) id: number,
    @User() authorPayload: AuthorPayload,
  ): Promise<null> {
    return await this.toDosService.remove(id, authorPayload);
  }
}
