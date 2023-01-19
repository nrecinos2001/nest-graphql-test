import { AuthorOutput, CreateAuthorInput } from 'src/author/dto';
import { Author } from 'src/author/entities';

export const johnDoe: Author = {
  id: 1,
  name: 'John Doe',
  email: 'john@doe.com',
  username: 'johnDoe',
  password: 'pasword',
  todos: [],
};

export const kamilDoe: Author = {
  id: 1,
  name: 'Kamil Doe',
  email: 'kamil@doe.com',
  username: 'kamilDoe',
  password: 'pasword',
  todos: [],
};

export const createAuthorInput: CreateAuthorInput = {
  name: 'John Doe',
  email: 'john@doe.com',
  username: 'johnDoe',
  password: 'password',
};

export const johnDoeOutput: AuthorOutput = {
  id: 1,
  name: 'John Doe',
  email: 'john@doe.com',
  username: 'johnDoe',
  todos: [],
};

export const kamilDoeOutput: AuthorOutput = {
  id: 1,
  name: 'Kamil Doe',
  email: 'kamil@doe.com',
  username: 'kamilDoe',
  todos: [],
};

export const authors: Author[] = [johnDoe, kamilDoe];

export const authorsOutput: AuthorOutput[] = [johnDoeOutput, kamilDoeOutput];
