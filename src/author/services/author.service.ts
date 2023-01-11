import { Injectable, NotFoundException } from '@nestjs/common';
import { Author } from 'src/author/entities/author.entity';
import { AuthorRepository } from 'src/author/repositories/';
import { CreateAuthorInput } from '../dto/create-author.input';
import { UpdateAuthorInput } from '../dto/update-author.input';

@Injectable()
export class AuthorService {
  create(createAuthorInput: CreateAuthorInput) {
    return 'This action adds a new author';
  }

  async findAll(): Promise<Author[]> {
    const authors = await AuthorRepository.findAll();
    return authors;
  }

  async findOne(id: number): Promise<Author> {
    const author = await AuthorRepository.findOneById(id);
    if (!author) throw new NotFoundException(`User with id ${id} was not found`)
    return author;
  }

  update(id: number, updateAuthorInput: UpdateAuthorInput) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
