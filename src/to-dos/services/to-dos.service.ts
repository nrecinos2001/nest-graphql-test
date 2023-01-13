import { Injectable } from '@nestjs/common';
import { AuthorRepository } from 'src/author/repositories';
import { ToDo } from 'src/to-dos/entities';
import { ToDoRepository } from 'src/to-dos/repositories';
import { AuthorPayload } from 'src/types';
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

  findAll() {
    return `This action returns all toDos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} toDo`;
  }

  update(id: number, updateToDoInput: UpdateToDoInput) {
    return `This action updates a #${id} toDo`;
  }

  remove(id: number) {
    return `This action removes a #${id} toDo`;
  }
}
