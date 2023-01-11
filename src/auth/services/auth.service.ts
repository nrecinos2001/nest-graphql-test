import { Injectable } from '@nestjs/common';
import { AuthorService } from 'src/author/services';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

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

  async login(user: any) {
    const payload = { username: user.username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
