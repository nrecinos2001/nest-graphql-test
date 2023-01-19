import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from '../services/author.service';
import { AuthorRepository } from '../repositories';
import {
  johnDoe,
  johnDoeOutput,
  createAuthorInput,
  authorsOutput,
  authors,
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
            return johnDoe;
          });
        const result = service.create(createAuthorInput);
        await expect(result).resolves.toEqual(johnDoeOutput);
      });
    });

    describe('findAll', () => {
      describe('When asks for all users', () => {
        it('should return a list of authors', async () => {
          jest
            .spyOn(AuthorRepository, 'findAll')
            .mockImplementation(async () => {
              return authors;
            });
          const result = service.findAll();
          await expect(result).resolves.toEqual(authorsOutput);
        });
      });
    });

    describe('findOne', () => {
      describe('When a user is asked', () => {
        it('should return a user', async () => {
          const id = 1;
          jest
            .spyOn(AuthorRepository, 'findOneByAuthorId')
            .mockImplementation(async () => {
              return johnDoe;
            });
          const result = service.findOne(id);
          await expect(result).resolves.toEqual(johnDoe);
        });
      });
    });
  });
});
