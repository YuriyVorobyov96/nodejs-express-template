import { inject, injectable } from 'inversify';

import TYPES from '../../common/dependency-injection/types';
import { IConfigService } from '../../config/interfaces/config.service.interface';
import User from './entities/user.entity';
import { IUserLogin } from './interfaces/user-login.interface';
import { IUserRegister } from './interfaces/user-register.interface';
import { IUsersService } from './interfaces/users.service.interface';

@injectable()
export default class UsersService implements IUsersService {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
  ) {}

  public async create({
    email,
    password,
  }: IUserRegister): Promise<User | null> {
    const user = new User(email);

    const saltRound = this.configService.get('SALT');

    await user.setPassword(password, Number(saltRound));

    return user;
  }

  public async login({ email, password }: IUserLogin): Promise<boolean> {
    return Promise.resolve(true);
  }
}
