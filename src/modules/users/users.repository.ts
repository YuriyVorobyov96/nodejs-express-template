import { inject, injectable } from 'inversify';
import { DataSource } from 'typeorm';

import TYPES from '../../common/dependency-injection/types';
import User from '../../database/entities/user.entity';
import { IDatabaseService } from '../../database/interfaces/database.service.interface';
import { IUserRegister } from './interfaces/user-register.interface';
import { IUsersRepository } from './interfaces/user-repository.interface';

@injectable()
export default class UsersRepository implements IUsersRepository {
  public readonly entityManager = this.database
    .getConnection()
    .createEntityManager();

  constructor(
    @inject(TYPES.IDatabaseService)
    private database: IDatabaseService<DataSource>,
  ) {}

  public async create({ email, password }: IUserRegister): Promise<User> {
    const user = new User({
      email,
      password,
    });

    await this.entityManager.transaction((manager) => manager.save(user));

    return user;
  }

  public async find(email: string): Promise<User | null> {
    return this.entityManager.findOneBy(User, { email });
  }
}
