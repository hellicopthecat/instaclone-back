import client from '../../client';
import { Resolvers } from '../../types';
import bcrypt from 'bcrypt';

export default {
  Mutation: {
    createUser: async (
      _,
      { userName, firstName, lastName, email, password },
    ) => {
      try {
        const userExists = await client.user.findFirst({
          where: { OR: [{ userName }, { email }] },
        });
        const bcryptPw = await bcrypt.hash(password, 10);
        if (userExists) {
          throw new Error('이미 이메일 혹은 / 유저이름을 사용하고 있습니다.');
        }
        const createUser = await client.user.create({
          data: {
            userName,
            email,
            firstName,
            lastName,
            password: bcryptPw,
          },
        });
        return {
          ok: true,
        };
      } catch (error) {
        return error;
      }
    },
  },
} as Resolvers;
