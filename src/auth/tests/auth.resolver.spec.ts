import { Test, TestingModule } from '@nestjs/testing';

import { LoginInput } from '@Auth/dto';
import { AuthService } from '@Auth/services';
import { accessTokenResponse, access_token } from '@Auth/tests/mocks';
import { AuthResolver } from '@Auth/resolvers';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('loginUser', () => {
    describe('When a user is logged in', () => {
      it('should return an access token', async () => {
        const loginInput: LoginInput = {
          username: 'jhonDoe',
          password: 'password555',
        };
        jest
          .spyOn(authService, 'login')
          .mockResolvedValueOnce(accessTokenResponse);
        const result = resolver.loginUser(loginInput);
        await expect(result).resolves.toEqual(
          expect.objectContaining({ access_token }),
        );
      });
    });
  });
});
