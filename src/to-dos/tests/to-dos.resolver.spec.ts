import { Test, TestingModule } from '@nestjs/testing';
import { ToDosResolver } from '../resolvers/to-dos.resolver';
import { ToDosService } from '../services/to-dos.service';

describe('ToDosResolver', () => {
  let resolver: ToDosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToDosResolver, ToDosService],
    }).compile();

    resolver = module.get<ToDosResolver>(ToDosResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
