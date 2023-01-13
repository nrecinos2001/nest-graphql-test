import { Author } from 'src/author/entities';
import { mySqlConnection } from 'src/config/database';
import { CreateToDoInput } from 'src/to-dos/dto/create-to-do.input';
import { UpdateToDoInput } from 'src/to-dos/dto/update-to-do.input';
import { ToDo } from 'src/to-dos/entities/';

export const ToDoRepository = mySqlConnection.getRepository(ToDo).extend({
  async createToDo(todo: CreateToDoInput, author: Author): Promise<ToDo> {
    const createToDo = ToDoRepository.create({ ...todo, author });
    const savedTodo = await ToDoRepository.save(createToDo);
    return savedTodo;
  },

  async findAll(): Promise<ToDo[]> {
    const todos = await ToDoRepository.find({ relations: ['author'] });
    return todos;
  },

  async findOneByTodoId(id: number): Promise<ToDo> {
    const todo = await ToDoRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    return todo;
  },

  async updateOne(todo: ToDo, updateToDoInput: UpdateToDoInput): Promise<ToDo> {
    const updateTodo = { ...todo, ...updateToDoInput };
    const updatedToDo = await ToDoRepository.save(updateTodo);
    return updatedToDo;
  }
});
