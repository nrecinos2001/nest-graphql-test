import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { LoginInput } from 'src/auth/dto';
import { AuthorService } from 'src/author/services';
import { johnDoe } from 'src/author/tests/mocks';
import { AuthService } from '../services/';

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
        const access_token =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
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
