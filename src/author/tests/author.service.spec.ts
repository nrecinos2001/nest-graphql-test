import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from '../services/author.service';
import { AuthorRepository } from '../repositories';
import {
  author,
  authorOutput,
  createAuthorInput,
} from 'src/author/tests/mocks';

describe('AuthorService', () => {
  let service: AuthorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorService],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createAuthor', () => {
    describe('When a new Author is created', () => {
      it('should return the created author', async () => {
        jest
          .spyOn(AuthorRepository, 'createOne')
          .mockImplementation(async () => {
            return author;
          });
        const result = service.create(createAuthorInput);
        await expect(result).resolves.toEqual(authorOutput);
      });
    });
  });
});
