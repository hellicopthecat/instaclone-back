import jwt, { JwtPayload } from 'jsonwebtoken';
import client from '../client';
import { Context, IArgs, Resolver } from '../types';
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
  (root: any, args: IArgs, context: Context, info: any) => {
    if (!context.loginUserToken) {
      return {
        ok: false,
        error: '로그인하세요.',
      };
    }
    return resolvers(root, args, context, info);
  };
