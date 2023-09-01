import 'reflect-metadata';

import { Container } from 'inversify';

import TYPES from '../../common/dependency-injection/types';
import User from '../../database/entities/user.entity';
import { IUserRegister } from './interfaces/user-register.interface';
import { IUsersRepository } from './interfaces/user-repository.interface';
import { IUsersService } from './interfaces/users.service.interface';
import UsersService from './users.service';

const container = new Container();

let usersRepository: IUsersRepository;
let usersService: IUsersService;

const usersRepositoryMock: IUsersRepository = {
  find: jest.fn(),
  create: jest.fn(),
};

beforeAll(() => {
  container.bind<IUsersService>(TYPES.IUsersService).to(UsersService);
  container
    .bind<IUsersRepository>(TYPES.IUsersRepository)
    .toConstantValue(usersRepositoryMock);

  usersRepository = container.get<IUsersRepository>(TYPES.IUsersRepository);
  usersService = container.get<IUsersService>(TYPES.IUsersService);
});

describe('User flow', () => {
  it('Create user - success', async () => {
    usersRepository.create = jest.fn().mockImplementationOnce(
      ({ email, password }: IUserRegister): User => ({
        email,
        password,
        id: 1,
      }),
    );

    const user = await usersService.create({
      email: 'testov@test.com',
      password: 'password',
    });

    expect(user?.id).toEqual(1);
    expect(user?.password).not.toEqual('password');
  });

  it('Create user - user exists', async () => {
    usersService.getUserByEmail = jest.fn().mockImplementationOnce(
      (): User => ({
        email: 'testov@test.com',
        password: 'password',
        id: 1,
      }),
    );

    const result = await usersService.create({
      email: 'testov@test.com',
      password: 'password',
    });

    expect(result).toEqual(null);
  });
});
