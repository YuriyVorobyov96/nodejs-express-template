import { IsEmail, IsString } from 'class-validator';

export default class UserLoginDto {
  @IsEmail({}, { message: 'Invalid email' })
  public email: string;

  @IsString({ message: 'Invalid password' })
  public password: string;
}
