import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export default class User {
  constructor(data?: Partial<User>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public email: string;

  @Column()
  public password: string;
}
