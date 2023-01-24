import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { ConfigModuleOptions, DatabaseModule } from '@Config/module';
import { AuthorModule } from '@Authors/author.module';
import { AuthModule } from '@Auth/auth.module';
import { ToDosModule } from '@ToDos/to-dos.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModuleOptions,
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    AuthorModule,
    AuthModule,
    ToDosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
