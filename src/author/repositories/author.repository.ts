import { Author } from "src/author/entities/author.entity";
import { mySqlConnection } from "src/config/database";

export const AuthorRepository = mySqlConnection.getRepository(Author).extend({
  async findAll(): Promise<Author[]> {
    const authors = await AuthorRepository.find();
    return authors;
  },

  async findOneById(id: number): Promise<Author> {
    const author = await AuthorRepository.findOne({ where: { id } });
    return author;
  }
})