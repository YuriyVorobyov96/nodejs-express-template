import { hash } from 'bcrypt';

export default class User {
  private _password: string;

  constructor(private readonly _email: string) {}

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  public async setPassword(pass: string, salt: number): Promise<void> {
    this._password = await hash(pass, salt);
  }
}
