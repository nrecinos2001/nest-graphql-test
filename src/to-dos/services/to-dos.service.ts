import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorRepository } from 'src/author/repositories';
import { ToDo } from 'src/to-dos/entities';
import { ToDoRepository } from 'src/to-dos/repositories';
import { AuthorPayload } from 'src/types';
import { validateSameUser } from 'src/utils';
import { CreateToDoInput } from '../dto/create-to-do.input';
import { UpdateToDoInput } from '../dto/update-to-do.input';

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

  remove(id: number) {
    return `This action removes a #${id} toDo`;
  }
}
