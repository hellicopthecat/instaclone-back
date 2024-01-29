import { Resolvers } from '../../types';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import client from '../../client';

export default {
  Mutation: {
    login: async (_, { userName, password }) => {
      try {
        const userExists = await client.user.findFirst({ where: { userName } });
        if (!userExists) {
          return {
            ok: false,
            error: '유저가 존재하지 않습니다.',
          };
        }
        const passwordOK = await bcrypt.compare(password, userExists.password);
        if (!passwordOK) {
          return {
            ok: false,
            error: '비밀번호가 일치하지 않습니다.',
          };
        }
        const token = await jwt.sign(
          { id: userExists.id },
          process.env.SECRET_KEY as string,
        );
        return {
          ok: true,
          token,
        };
      } catch (err) {
        return err;
      }
    },
  },
} as Resolvers;
