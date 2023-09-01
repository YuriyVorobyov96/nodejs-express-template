import User from '../../../database/entities/user.entity';
import UserLoginDto from '../dto/user-login.dto';
import UserRegisterDto from '../dto/user-register.dto';
import { IUserInfo } from './user-info.interface';

export interface IUsersService {
  create: (data: UserRegisterDto) => Promise<User | null>;
  login: (data: UserLoginDto) => Promise<string | null>;
  info: (email: string) => Promise<IUserInfo | null>;
  getUserByEmail: (email: string) => Promise<User | null>;
}
