import { PrismaClient, User } from '@prisma/client';

export interface IUser {
  id: number;
  firstName: string;
  lastName?: string;
  password: string;
  userName: string;
  email: string;
  createAt: string;
  updatedAt: string;
}

export type IArgs = {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bio: string;
  avatar: string;
  page: number;
  lastId: number;
  keyword: string;
};
export type Context = {
  loginUserToken: User;
  client: PrismaClient;
};

export type Resolver = (
  root: IUser,
  args: IArgs,
  context: Context,
  info: any,
) => any;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};
