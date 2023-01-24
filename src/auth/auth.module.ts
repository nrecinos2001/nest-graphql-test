import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from '@Auth/services';
import { AuthResolver } from '@Auth/resolvers';
import { AuthorModule } from '@Authors/author.module';
import { jwtConstants } from '@Common/constants';
import { JwtStrategy, LocalStrategy } from '@Common/strategies';
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
