import { CreateAuthorInput } from 'src/author/dto';
import { Author } from 'src/author/entities/author.entity';
import { mySqlConnection } from 'src/config/database';

export const AuthorRepository = mySqlConnection.getRepository(Author).extend({
  async findAll(): Promise<Author[]> {
    const authors = await AuthorRepository.find({ relations: ['todos'] });
    return authors;
  },

  async findOneByAuthorId(id: number): Promise<Author> {
    const author = await AuthorRepository.findOne({
      where: { id },
      relations: ['todos'],
    });
    return author;
  },

  async findOneByUsername(username: string): Promise<Author> {
    const author = await AuthorRepository.findOne({ where: { username } });
    return author;
  },

  async createOne(createAuthorInput: CreateAuthorInput): Promise<Author> {
    const newAuthor = AuthorRepository.create(createAuthorInput);
    const savedAuthor = await AuthorRepository.save(newAuthor);
    return savedAuthor;
  },
});
