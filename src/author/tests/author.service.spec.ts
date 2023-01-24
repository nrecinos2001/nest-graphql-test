import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { AuthorService } from '@Authors/services/';
import { AuthorRepository } from '@Authors/repositories';
import {
  johnDoe,
  johnDoeOutput,
  createAuthorInput,
  authorsOutput,
  authors,
  updatedJohnDoe,
  authorPayload,
  updateAuthorInput,
} from '@Authors/tests/mocks';

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
            .mockImplementationOnce(async () => {
              return johnDoe;
            });
          const result = service.findOne(id);
          await expect(result).resolves.toEqual(johnDoe);
        });
      });

      describe('When a user is not found', () => {
        it('should return a Not Found Exception', async () => {
          const id = 1;
          jest
            .spyOn(AuthorRepository, 'findOneByAuthorId')
            .mockImplementationOnce(async () => {
              return undefined;
            });
          const result = service.findOne(id);
          await expect(result).rejects.toThrow(
            new NotFoundException(`User with id ${id} was not found`),
          );
        });
      });
    });

    describe('findOneByUsername', () => {
      describe('When a user is asked', () => {
        it('should return a user', async () => {
          const username = 'johnDoe';
          jest
            .spyOn(AuthorRepository, 'findOneByUsername')
            .mockImplementationOnce(async () => {
              return johnDoe;
            });
          const result = service.findOneByUsername(username);
          await expect(result).resolves.toEqual(johnDoe);
        });
      });

      describe('When a user is not found', () => {
        it('should return a Not Found Exception', async () => {
          const username = 'johnDoe';
          jest
            .spyOn(AuthorRepository, 'findOneByUsername')
            .mockImplementation(async () => {
              return undefined;
            });
          const result = service.findOneByUsername(username);
          await expect(result).rejects.toThrow(new NotFoundException());
        });
      });
    });

    describe('update', () => {
      describe('When an author is updated', () => {
        it('should return the updated author', async () => {
          jest
            .spyOn(AuthorRepository, 'findOne')
            .mockImplementationOnce(async () => {
              return johnDoe;
            });
          jest
            .spyOn(AuthorRepository, 'save')
            .mockImplementationOnce(async () => {
              return updatedJohnDoe;
            });
          const result = service.update(authorPayload, updateAuthorInput);
          await expect(result).resolves.toEqual(updatedJohnDoe);
        });
      });
    });

    describe('remove', () => {
      describe('When deletes a user and it is the one validated', () => {
        it('should return null', async () => {
          const id = 1;
          jest
            .spyOn(AuthorRepository, 'findOne')
            .mockImplementation(async () => {
              return johnDoe;
            });
          jest
            .spyOn(AuthorRepository, 'remove')
            .mockImplementation(async () => {
              return null;
            });
          const result = service.remove(id, authorPayload);
          await expect(result).resolves.toEqual(null);
        });
      });
    });
  });
});
