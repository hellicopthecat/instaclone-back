import jwt, { JwtPayload } from 'jsonwebtoken';
import client from '../client';
import { Context, IArgs, IUser, Resolver } from '../types';
import { GraphQLResolveInfo } from 'graphql';
export const getUser = async (token: any) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = (await jwt.verify(
      token,
      process.env.SECRET_KEY as string,
    )) as JwtPayload;
    const user = client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const protectResolver =
  (resolvers: Resolver) =>
  (root: IUser, args: IArgs, context: Context, info: GraphQLResolveInfo) => {
    if (!context.loginUserToken) {
      const query = info.operation.operation === 'query';
      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: '로그인하세요.',
        };
      }
    }
    return resolvers(root, args, context, info);
  };
