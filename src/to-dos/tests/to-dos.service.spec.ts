import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthorRepository } from 'src/author/repositories';
import { johnDoe } from 'src/author/tests/mocks';
import { AuthorPayload } from 'src/common/types';
import { CreateToDoInput, UpdateToDoInput } from 'src/to-dos/dto';
import { ToDoRepository } from 'src/to-dos/repositories';
import { ToDosService } from 'src/to-dos/services';
import { todo, toDosList, updatedToDo } from 'src/to-dos/tests/mocks';

describe('ToDosService', () => {
  let service: ToDosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToDosService],
    }).compile();

    service = module.get<ToDosService>(ToDosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    describe('When a new To Do is added', () => {
      it('Should return the To Do created', async () => {
        const createToDoInput: CreateToDoInput = {
          title: 'Create Tests for the API',
        };
        const authorPayload: AuthorPayload = {
          id: 1,
          username: 'johnDoe',
        };
        jest
          .spyOn(AuthorRepository, 'findOneByAuthorId')
          .mockResolvedValueOnce(johnDoe);
        jest.spyOn(ToDoRepository, 'createToDo').mockResolvedValueOnce(todo);
        const result = service.create(createToDoInput, authorPayload);
        await expect(result).resolves.toEqual(todo);
      });
    });
  });

  describe('findAll', () => {
    describe('When all the To Dos are asked', () => {
      it('should return a list of all To Dos', async () => {
        jest.spyOn(ToDoRepository, 'findAll').mockResolvedValueOnce(toDosList);
        const result = service.findAll();
        await expect(result).resolves.toEqual(toDosList);
      });
    });
  });

  describe('findOne', () => {
    describe('When a To Do is asked', () => {
      it('should return the to do asked', async () => {
        const id = 1;
        jest
          .spyOn(ToDoRepository, 'findOneByTodoId')
          .mockResolvedValueOnce(todo);
        const result = service.findOne(id);
        await expect(result).resolves.toEqual(todo);
      });
    });

    describe('When a To Do is not found', () => {
      it('should throw a NotFoundException', async () => {
        const id = 5;
        jest
          .spyOn(ToDoRepository, 'findOneByTodoId')
          .mockResolvedValueOnce(undefined);
        const result = service.findOne(id);
        await expect(result).rejects.toThrow(new NotFoundException());
      });
    });
  });

  describe('update', () => {
    describe('when a To Do is updated', () => {
      it('should return the updated To Do', async () => {
        const authorPayload: AuthorPayload = {
          id: 1,
          username: 'johnDoe',
        };
        const updateToDoInput: UpdateToDoInput = {
          id: 1,
          isCompleted: true,
        };
        jest.spyOn(ToDoRepository, 'findOne').mockResolvedValueOnce(todo);
        jest.spyOn(ToDoRepository, 'save').mockResolvedValueOnce(updatedToDo);
        const result = service.update(authorPayload, updateToDoInput);
        await expect(result).resolves.toEqual(updatedToDo);
      });
    });
  });

  describe('remove', () => {
    describe('When a To Do is deleted', () => {
      it('should return null', async () => {
        const authorPayload: AuthorPayload = {
          id: 1,
          username: 'johnDoe',
        };
        const id = 1;
        jest.spyOn(ToDoRepository, 'findOne').mockResolvedValueOnce(todo);
        jest.spyOn(ToDoRepository, 'remove').mockResolvedValueOnce(null);
        const result = service.remove(id, authorPayload);
        await expect(result).resolves.toEqual(null);
      })
    })
  })
});
