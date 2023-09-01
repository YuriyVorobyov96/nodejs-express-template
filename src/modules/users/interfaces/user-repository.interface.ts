import { UserModel } from '../../../database/entities/user.entity';
import User from '../entities/user.entity';

export interface IUsersRepository {
  create: (user: User) => Promise<UserModel>;
  find: (email: string) => Promise<UserModel | null>;
}
