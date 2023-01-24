import { Injectable, NotFoundException } from '@nestjs/common';

import { AuthorRepository } from '@Authors/repositories';
import { ToDo } from '@ToDos/entities';
import { ToDoRepository } from '@ToDos/repositories';
import { CreateToDoInput, UpdateToDoInput } from '@ToDos/dto';
import { AuthorPayload } from '@Common/types';
import { validateSameUser } from '@Common/utils';

@Injectable()
export class ToDosService {
  async create(
    createToDoInput: CreateToDoInput,
    authorPayload: AuthorPayload,
  ): Promise<ToDo> {
    const author = await AuthorRepository.findOneByAuthorId(authorPayload.id);
    const todo = await ToDoRepository.createToDo(createToDoInput, author);
    return todo;
  }

  async findAll(): Promise<ToDo[]> {
    const todos = await ToDoRepository.findAll();
    return todos;
  }

  async findOne(id: number): Promise<ToDo> {
    const todo = await ToDoRepository.findOneByTodoId(id);
    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }

  async update(
    authorPayload: AuthorPayload,
    updateToDoInput: UpdateToDoInput,
  ): Promise<ToDo> {
    const todo = await this.findOne(updateToDoInput.id);
    validateSameUser(authorPayload.id, todo.author.id);
    const updateToDo = await ToDoRepository.updateOne(todo, updateToDoInput);
    return updateToDo;
  }

  async remove(id: number, authorPayload: AuthorPayload): Promise<null> {
    const todo = await this.findOne(id);
    validateSameUser(authorPayload.id, todo.author.id);
    await ToDoRepository.remove(todo);
    return null;
  }
}
