import { johnDoe, kamilDoe } from 'src/author/tests/mocks';
import { ToDo } from 'src/to-dos/entities';

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
