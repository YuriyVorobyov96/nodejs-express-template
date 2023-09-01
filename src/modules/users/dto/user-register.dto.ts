import { IsEmail, IsString, Length } from 'class-validator';

export default class UserRegisterDto {
  @IsEmail({}, { message: 'Invalid email' })
  public email: string;

  @IsString({ message: 'Invalid password' })
  @Length(8)
  public password: string;
}
