import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { LoginInput } from '@Auth/dto';
import { access_token } from '@Auth/tests/mocks';
import { AuthService } from '@Auth/services/';
import { AuthorService } from '@Authors/services';
import { johnDoe } from '@Authors/tests/mocks';

describe('AuthService', () => {
  let service: AuthService;
  let authorService: AuthorService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: AuthorService,
          useValue: {
            findOneByUsername: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    authorService = module.get<AuthorService>(AuthorService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(authorService).toBeDefined();
  });

  describe('login', () => {
    describe('When login successfully', () => {
      it('should return a token', async () => {
        const credentials: LoginInput = {
          username: 'jhonDoe',
          password: 'password',
        };
        jest
          .spyOn(authorService, 'findOneByUsername')
          .mockResolvedValueOnce(johnDoe);
        jest.spyOn(jwtService, 'sign').mockImplementationOnce(() => {
          return access_token;
        });
        const result = service.login(credentials);
        await expect(result).resolves.toEqual({
          access_token,
        });
      });
    });

    describe('When login is not done', () => {
      it('should throw an Unauthorized Exception', async () => {
        const credentials: LoginInput = {
          username: 'jhonDoe',
          password: 'password555',
        };
        jest
          .spyOn(authorService, 'findOneByUsername')
          .mockResolvedValueOnce(johnDoe);
        const result = service.login(credentials);
        await expect(result).rejects.toThrow(new UnauthorizedException());
      });
    });
  });
});
