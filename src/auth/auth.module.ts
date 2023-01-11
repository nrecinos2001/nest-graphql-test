import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/services';
import { JwtStrategy, LocalStrategy } from 'src/auth/strategies';
import { AuthorModule } from 'src/author/author.module';
import { AuthResolver } from './resolvers/auth.resolver';
import { jwtConstants } from 'src/auth/constants/constants';
@Module({
  imports: [
    AuthorModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '99999s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthResolver],
})
export class AuthModule {}
