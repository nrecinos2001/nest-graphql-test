import { Author } from 'src/author/entities';
import { mySqlConnection } from 'src/config/database';
import { CreateToDoInput } from 'src/to-dos/dto/create-to-do.input';
import { ToDo } from 'src/to-dos/entities/';

export const ToDoRepository = mySqlConnection.getRepository(ToDo).extend({
  async createToDo(todo: CreateToDoInput, author: Author): Promise<ToDo> {
    const createToDo = ToDoRepository.create({ ...todo, author });
    const savedTodo = await ToDoRepository.save(createToDo);
    return savedTodo;
  },
});
