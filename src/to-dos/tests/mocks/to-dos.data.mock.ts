import { johnDoe, kamilDoe } from 'src/author/tests/mocks';
import { CreateToDoInput, UpdateToDoInput } from 'src/to-dos/dto';
import { ToDo } from 'src/to-dos/entities';

export const createToDoInput: CreateToDoInput = {
  title: 'Create Tests for the API',
};

export const updateToDoInput: UpdateToDoInput = {
  id: 1,
  isCompleted: true,
};

export const todo: ToDo = {
  id: 1,
  title: 'Create Tests for the API',
  isCompleted: false,
  author: johnDoe,
};

export const updatedToDo: ToDo = {
  ...todo,
  isCompleted: true,
};

export const testToDo: ToDo = {
  id: 2,
  title: 'Test Todo creation flow',
  isCompleted: false,
  author: kamilDoe,
};

export const toDosList: ToDo[] = [todo, testToDo];
