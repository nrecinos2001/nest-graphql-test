import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { LoggedAuthorOutput, LoginInput } from '@Auth/dto';
import { AuthService } from '@Auth/services';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => LoggedAuthorOutput)
  async loginUser(@Args('loginInput') loginInput: LoginInput) {
    return await this.authService.login(loginInput);
  }
}
