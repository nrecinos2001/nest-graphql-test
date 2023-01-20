import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthorService } from 'src/author/services';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthorCredentials } from 'src/common/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly authorService: AuthorService,
    private readonly jwtService: JwtService,
  ) {}
  async validateAuthor(username: string, password: string): Promise<any> {
    const author = await this.authorService.findOneByUsername(username);
    const validPassword = await bcrypt.compare(password, author.password);
    if (author && validPassword) {
      const { password, ...result } = author;
      return result;
    }
    return null;
  }

  async login(credentials: AuthorCredentials) {
    const validAuthor = await this.validateAuthor(
      credentials.username,
      credentials.password,
    );
    if (!validAuthor) {
      throw new UnauthorizedException();
    }
    const payload = { username: validAuthor.username, id: validAuthor.id };
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
