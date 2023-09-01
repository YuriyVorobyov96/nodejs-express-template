import { UserModel } from '../../../database/models/user.model';
import User from '../entities/user.entity';

export interface IUsersRepository {
  create: (user: User) => Promise<UserModel>;
  find: (email: string) => Promise<UserModel | null>;
}
