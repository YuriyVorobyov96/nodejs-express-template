import { Users } from '@prisma/client';
import { inject, injectable } from 'inversify';

import TYPES from '../../common/dependency-injection/types';
import User from '../../database/entities/user.entity';
import PrismaService from '../../database/prisma.service';
import { IUsersRepository } from './interfaces/user-repository.interface';

@injectable()
export default class UsersRepository implements IUsersRepository {
  constructor(
    @inject(TYPES.PrismaService) private prismaService: PrismaService,
  ) {}

  public async create({ email, password }: User): Promise<Users> {
    return this.prismaService.client.users.create({
      data: {
        email,
        password,
      },
    });
  }

  public async find(email: string): Promise<Users | null> {
    return this.prismaService.client.users.findFirst({
      where: {
        email,
      },
    });
  }
}
