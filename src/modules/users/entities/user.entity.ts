import { compare, hash } from 'bcrypt';

export default class User {
  private _password: string;

  constructor(private readonly _email: string) {}

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  public async setPassword(password: string, salt: number): Promise<void> {
    this._password = await hash(password, salt);
  }

  public comparePassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return compare(password, passwordHash);
  }
}
