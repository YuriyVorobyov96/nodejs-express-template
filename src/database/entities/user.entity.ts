export default class User {
  constructor(data?: Partial<User>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  public id: number;

  public email: string;

  public password: string;
}
