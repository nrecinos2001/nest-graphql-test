import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from 'src/auth/services';
import { JwtStrategy, LocalStrategy } from 'src/common/strategies';
import { AuthorModule } from 'src/author/author.module';
import { AuthResolver } from './resolvers';
import { jwtConstants } from 'src/common/constants';
@Module({
  imports: [
    AuthorModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '999s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthResolver],
})
export class AuthModule {}
