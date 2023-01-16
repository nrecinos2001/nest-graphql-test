import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateAuthorInput, UpdateAuthorInput } from 'src/author/dto';
import { Author } from 'src/author/entities/author.entity';
import { AuthorRepository } from 'src/author/repositories/';
import { AuthorPayload } from 'src/common/types';
import { validateSameUser } from 'src/common/utils';

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
    const author = await AuthorRepository.findOneByAuthorId(id);
    if (!author)
      throw new NotFoundException(`User with id ${id} was not found`);
    return author;
  }

  async findOneByUsername(username: string): Promise<Author> {
    const author = await AuthorRepository.findOneByUsername(username);
    if (!author) throw new NotFoundException();
    return author;
  }

  async update(
    currentAuthor: AuthorPayload,
    updateAuthorInput: UpdateAuthorInput,
  ): Promise<Author> {
    const author = await this.findOne(updateAuthorInput.id);
    validateSameUser(currentAuthor.id, updateAuthorInput.id);
    const updateAuthor = { ...author, ...updateAuthorInput };
    const updatedAuthor = await AuthorRepository.save(updateAuthor);
    return updatedAuthor;
  }

  async remove(id: number, authorPayload: AuthorPayload): Promise<null> {
    const author = await this.findOne(id);
    validateSameUser(authorPayload.id, author.id);
    await AuthorRepository.remove(author);
    return null;
  }
}
