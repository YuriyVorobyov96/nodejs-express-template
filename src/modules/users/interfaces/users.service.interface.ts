import UserLoginDto from '../dto/user-login.dto';
import UserRegisterDto from '../dto/user-register.dto';
import User from '../entities/user.entity';

export interface IUsersService {
  create: (data: UserRegisterDto) => Promise<User | null>;
  login: (data: UserLoginDto) => Promise<boolean>;
}
