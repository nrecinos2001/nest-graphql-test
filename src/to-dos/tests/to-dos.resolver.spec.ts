import { Test, TestingModule } from '@nestjs/testing';

import { authorPayload } from 'src/author/tests/mocks';
import {
  createToDoInput,
  todo,
  toDosList,
  updatedToDo,
  updateToDoInput,
} from 'src/to-dos/tests/mocks';
import { ToDosResolver } from '../resolvers/to-dos.resolver';
import { ToDosService } from '../services/to-dos.service';

describe('ToDosResolver', () => {
  let resolver: ToDosResolver;
  let toDosService: ToDosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToDosResolver, ToDosService],
    }).compile();

    resolver = module.get<ToDosResolver>(ToDosResolver);
    toDosService = module.get<ToDosService>(ToDosService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createTodo', () => {
    describe('When a ToDo is created', () => {
      it('should return the created todo', async () => {
        jest.spyOn(toDosService, 'create').mockResolvedValueOnce(todo);
        const result = resolver.createToDo(createToDoInput, authorPayload);
        await expect(result).resolves.toEqual(todo);
      });
    });
  });

  describe('findAll', () => {
    describe('When all To dos are asked', () => {
      it('should return a list', async () => {
        jest.spyOn(toDosService, 'findAll').mockResolvedValueOnce(toDosList);
        const result = resolver.findAll();
        await expect(result).resolves.toEqual(toDosList);
      });
    });
  });

  describe('findOne', () => {
    describe('When a To Do is asked', () => {
      it('should return the To Do', async () => {
        jest.spyOn(toDosService, 'findOne').mockResolvedValueOnce(todo);
        const result = resolver.findOne(1);
        await expect(result).resolves.toEqual(todo);
      });
    });
  });

  describe('updateToDo', () => {
    describe('When a To Do is updated', () => {
      it('should return the updated To Do', async () => {
        jest.spyOn(toDosService, 'update').mockResolvedValueOnce(updatedToDo);
        const result = resolver.updateToDo(updateToDoInput, authorPayload);
        await expect(result).resolves.toEqual(updatedToDo);
      });
    });
  });

  describe('removeToDo', () => {
    describe('When a To Do is removed', () => {
      it('should return null', async () => {
        jest.spyOn(toDosService, 'remove').mockResolvedValueOnce(null);
        const result = resolver.removeToDo(1, authorPayload);
        await expect(result).resolves.toEqual(null);
      });
    });
  });
});
