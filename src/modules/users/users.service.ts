import { compare, hash } from 'bcrypt';
import config from 'config';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { sign } from 'jsonwebtoken';

import HttpError from '../../common/classes/http-error.class';
import TYPES from '../../common/dependency-injection/types';
import User from '../../database/entities/user.entity';
import { IUserInfo } from './interfaces/user-info.interface';
import { IUserLogin } from './interfaces/user-login.interface';
import { IUserRegister } from './interfaces/user-register.interface';
import { IUsersRepository } from './interfaces/user-repository.interface';
import { IUsersService } from './interfaces/users.service.interface';

const SALT_ROUND: number = config.get('password.salt_round');
const JWT_SECRET: string = config.get('jwt.secret');

@injectable()
export default class UsersService implements IUsersService {
  constructor(
    @inject(TYPES.IUsersRepository) private usersRepository: IUsersRepository,
  ) {}

  public async create({
    email,
    password,
  }: IUserRegister): Promise<User | null> {
    try {
      const existingUser = await this.getUserByEmail(email);

      if (existingUser) {
        return null;
      }

      const passwordHash = await this.hashPassword(password);

      return this.usersRepository.create({
        email,
        password: passwordHash,
      });
    } catch (e) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'Error on user creating');
    }
  }

  public async login({ email, password }: IUserLogin): Promise<string | null> {
    const existingUser = await this.getUserByEmail(email);

    if (!existingUser) {
      return null;
    }

    const isPasswordCompare = this.comparePassword(
      password,
      existingUser.password,
    );

    if (!isPasswordCompare) {
      return null;
    }

    return this.signJwt(email);
  }

  public async info(email: string): Promise<IUserInfo | null> {
    const existingUser = await this.usersRepository.find(email);

    if (!existingUser) {
      return null;
    }

    return {
      id: existingUser.id,
      email: existingUser.email,
    };
  }

  public getUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.find(email);
  }

  private hashPassword(password: string): Promise<string> {
    return hash(password, SALT_ROUND);
  }

  private comparePassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return compare(password, passwordHash);
  }

  private signJwt(email: string): Promise<string> {
    return new Promise((resolve, reject) => {
      sign(
        { email },
        JWT_SECRET,
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
