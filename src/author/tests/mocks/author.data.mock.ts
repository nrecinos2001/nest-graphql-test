import { AuthorOutput, CreateAuthorInput } from 'src/author/dto';
import { Author } from 'src/author/entities';

export const johnDoe: Author = {
  id: 1,
  name: 'John Doe',
  email: 'john@doe.com',
  username: 'johnDoe',
  password: '$2b$10$NH.itaNQA/AQu5Pg5nAg6OdOHZ.LovBG3uAhbEEtFmbd/CVcsQpqK',
  todos: [],
};

export const updatedJohnDoe: Author = {
  id: 1,
  name: 'John Doe',
  email: 'john@doe.com.sv',
  username: 'johnDoe123',
  password: 'password',
  todos: [],
};

export const kamilDoe: Author = {
  id: 1,
  name: 'Kamil Doe',
  email: 'kamil@doe.com',
  username: 'kamilDoe',
  password: 'password',
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
