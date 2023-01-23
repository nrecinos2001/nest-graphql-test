import { Test, TestingModule } from '@nestjs/testing';

import { UpdateAuthorInput } from 'src/author/dto';
import {
  authors,
  createAuthorInput,
  johnDoe,
  updatedJohnDoe,
} from 'src/author/tests/mocks';
import { AuthorPayload } from 'src/common/types';
import { AuthorResolver } from '../resolvers/author.resolver';
import { AuthorService } from '../services/author.service';

describe('AuthorResolver', () => {
  let resolver: AuthorResolver;
  let authorService: AuthorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorResolver, AuthorService],
    }).compile();

    resolver = module.get<AuthorResolver>(AuthorResolver);
    authorService = module.get<AuthorService>(AuthorService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createAuthor', () => {
    describe('When an author is created', () => {
      it('should return the created author', async () => {
        jest.spyOn(authorService, 'create').mockResolvedValueOnce(johnDoe);
        const result = resolver.createAuthor(createAuthorInput);
        await expect(result).resolves.toEqual(johnDoe);
      });
    });
  });

  describe('findAll', () => {
    describe('When the all the authors are asked', () => {
      it('should return a list with all the authors', async () => {
        jest.spyOn(authorService, 'findAll').mockResolvedValueOnce(authors);
        const result = resolver.findAll();
        await expect(result).resolves.toEqual(authors);
      });
    });
  });

  describe('findOne', () => {
    describe('When an author is asked', () => {
      it('should return an author only', async () => {
        jest.spyOn(authorService, 'findOne').mockResolvedValueOnce(johnDoe);
        const result = resolver.findOne(1);
        await expect(result).resolves.toEqual(johnDoe);
      });
    });
  });

  describe('updateAuthor', () => {
    describe('When an author is updated', () => {
      it('should return the author information updated', async () => {
        const updateAuthorInput: UpdateAuthorInput = {
          id: 1,
          username: 'johnDoe123',
          email: 'john@doe.com.sv',
        };
        const currentAuthor: AuthorPayload = {
          id: 1,
          username: 'johnDoe',
        };
        jest
          .spyOn(authorService, 'update')
          .mockResolvedValueOnce(updatedJohnDoe);
        const result = resolver.updateAuthor(updateAuthorInput, currentAuthor);
        await expect(result).resolves.toEqual(updatedJohnDoe);
      });
    });
  });

  describe('removeAuthor', () => {
    describe('When an author is removed', () => {
      it('should return null', async () => {
        const id = 1;
        const authorPayload: AuthorPayload = {
          id: 1,
          username: 'johnDoe',
        };
        jest.spyOn(authorService, 'remove').mockResolvedValueOnce(null);
        const result = resolver.removeAuthor(id, authorPayload);
        await expect(result).resolves.toEqual(null);
      });
    });
  });
});
