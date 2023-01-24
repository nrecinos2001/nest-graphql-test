import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateAuthorInput, UpdateAuthorInput } from '@Authors/dto';
import { AuthorOutput } from '@Authors/dto/author.output';
import { Author } from '@Authors/entities';
import { AuthorRepository } from '@Authors/repositories/';
import { AuthorPayload } from '@Common/types';
import { validateSameUser } from '@Common/utils';

@Injectable()
export class AuthorService {
  async create(createAuthorInput: CreateAuthorInput): Promise<AuthorOutput> {
    const { password } = createAuthorInput;
    createAuthorInput.password = await bcrypt.hash(password, 10);
    const newAuthor = await AuthorRepository.createOne(createAuthorInput);
    delete newAuthor.password;
    return newAuthor;
  }

  async findAll(): Promise<AuthorOutput[]> {
    const authors = await AuthorRepository.findAll();
    const authorsOutput = authors.map((author) => {
      delete author.password;
      return author;
    });
    return authorsOutput;
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
  ): Promise<AuthorOutput> {
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
