import { AuthorOutput, CreateAuthorInput } from "src/author/dto";
import { Author } from "src/author/entities";

export const author: Author = {
  id: 1,
  name: "John Doe",
  email: "john@doe.com",
  username: "johnDoe",
  password: "pasword",
  todos: [],
}

export const createAuthorInput: CreateAuthorInput = {
  name: "John Doe",
  email: "john@doe.com",
  username: "johnDoe",
  password: 'password',
};

export const authorOutput: AuthorOutput = {
  id: 1,
  name: "John Doe",
  email: "john@doe.com",
  username: "johnDoe",
  todos: []
}