import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoggedAuthorOutput } from 'src/auth/dtos/logedd.output';
import { LoginInput } from 'src/auth/dtos/login.input';
import { AuthService } from 'src/auth/services';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => LoggedAuthorOutput)
  async loginUser(@Args('loginInput') loginInput: LoginInput) {
    return await this.authService.login(loginInput);
  }
}
