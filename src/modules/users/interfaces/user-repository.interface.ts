import User from '../../../database/entities/user.entity';
import { IUserRegister } from './user-register.interface';

export interface IUsersRepository {
  create: (user: IUserRegister) => Promise<User>;
  find: (email: string) => Promise<User | null>;
}
