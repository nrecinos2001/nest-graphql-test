import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateAuthorInput, UpdateAuthorInput } from 'src/author/dto';
import { Author } from 'src/author/entities/author.entity';
import { AuthorRepository } from 'src/author/repositories/';

@Injectable()
export class AuthorService {
  async create(createAuthorInput: CreateAuthorInput): Promise<Author> {
    const { password } = createAuthorInput;
    createAuthorInput.password = await bcrypt.hash(password, 10);
    const newAuthor = await AuthorRepository.createOne(createAuthorInput);

    return newAuthor;
  }

  async findAll(): Promise<Author[]> {
    const authors = await AuthorRepository.findAll();
    return authors;
  }

  async findOne(id: number): Promise<Author> {
    const author = await AuthorRepository.findOneById(id);
    if (!author)
      throw new NotFoundException(`User with id ${id} was not found`);
    return author;
  }

  async findOneByUsername(username: string): Promise<Author> {
    const author = await AuthorRepository.findOneByUsername(username);
    if (!author) throw new NotFoundException();
    return author;
  }

  update(id: number, updateAuthorInput: UpdateAuthorInput) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
