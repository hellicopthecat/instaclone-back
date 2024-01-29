import { PrismaClient, User } from '@prisma/client';
import { GraphQLResolveInfo } from 'graphql';

export interface IUser {
  id: number;
  userId: number;
  firstName: string;
  lastName?: string;
  password: string;
  userName: string;
  email: string;
  createAt: string;
  updatedAt: string;
}
export interface IFile {
  fieldName: string;
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => any;
}

export type IArgs = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bio: string;
  avatar: IFile;
  page: number;
  lastId: number;
  photoId: number;
  roomId: number;
  userId: number;
  keyword: string;
  caption: string;
  file: IFile;
  hashtag: string;
  payload: string;
};
export type Context = {
  loginUserToken: User;
};

export type Resolver = (
  root: IUser,
  args: IArgs,
  context: Context,
  info: GraphQLResolveInfo,
) => any;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};
