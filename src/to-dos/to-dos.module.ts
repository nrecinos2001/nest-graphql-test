import { Module } from '@nestjs/common';
import { ToDosService } from './services/to-dos.service';
import { ToDosResolver } from './resolvers/to-dos.resolver';

@Module({
  providers: [ToDosResolver, ToDosService],
})
export class ToDosModule {}
