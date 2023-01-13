import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ToDosService } from '../services/to-dos.service';
import { ToDo } from '../entities/to-do.entity';
import { CreateToDoInput } from '../dto/create-to-do.input';
import { UpdateToDoInput } from '../dto/update-to-do.input';
import { User } from 'src/decorators';
import { AuthorPayload } from 'src/types';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/';

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
  @Mutation(() => ToDo)
  async removeToDo(@Args('id', { type: () => Int }) id: number) {
    return this.toDosService.remove(id);
  }
}
