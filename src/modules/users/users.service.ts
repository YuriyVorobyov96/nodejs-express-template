import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { sign } from 'jsonwebtoken';

import HttpError from '../../common/classes/http-error.class';
import TYPES from '../../common/dependency-injection/types';
import { IConfigService } from '../../config/interfaces/config.service.interface';
import { UserModel } from '../../database/models/user.model';
import User from './entities/user.entity';
import { IUserLogin } from './interfaces/user-login.interface';
import { IUserRegister } from './interfaces/user-register.interface';
import { IUsersRepository } from './interfaces/user-repository.interface';
import { IUsersService } from './interfaces/users.service.interface';

@injectable()
export default class UsersService implements IUsersService {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
  ) {}

  public async create({
    email,
    password,
  }: IUserRegister): Promise<User | null> {
    try {
      const user = new User(email);

      const saltRound = this.configService.get('SALT');

      await user.setPassword(password, Number(saltRound));

      const existingUser = await this.getUserByEmail(email);

      if (existingUser) {
        return null;
      }

      await this.usersRepository.create(user);

      return user;
    } catch (e) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'Error on user creating');
    }
  }

  public async login({ email, password }: IUserLogin): Promise<string | null> {
    const existingUser = await this.getUserByEmail(email);

    if (!existingUser) {
      return null;
    }

    const user = new User(existingUser.email);

    const isPasswordCompare = user.comparePassword(
      password,
      existingUser.password,
    );

    if (!isPasswordCompare) {
      return null;
    }

    return this.signJwt(email);
  }

  private getUserByEmail(email: string): Promise<UserModel> {
    return this.usersRepository.find(email);
  }

  private signJwt(email: string): Promise<string> {
    return new Promise((resolve, reject) => {
      sign(
        { email },
        this.configService.get('JWT_SECRET'),
        {
          expiresIn: '1d',
        },
        (err, token) => {
          if (err) {
            reject(err);
          }
          resolve(token);
        },
      );
    });
  }
}
