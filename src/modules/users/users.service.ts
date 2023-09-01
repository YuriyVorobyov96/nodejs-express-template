import { injectable } from 'inversify';

import User from './entities/user.entity';
import { IUserLogin } from './interfaces/user-login.interface';
import { IUserRegister } from './interfaces/user-register.interface';
import { IUsersService } from './interfaces/users.service.interface';

@injectable()
export default class UsersService implements IUsersService {
  public async create({
    email,
    password,
  }: IUserRegister): Promise<User | null> {
    const user = new User(email);

    await user.setPassword(password, 10);

    return user;
  }

  public async login({ email, password }: IUserLogin): Promise<boolean> {
    return Promise.resolve(true);
  }
}
