import client from '../../client';
import { protectResolver } from '../../users/user.utils';

export default {
  Mutation: {
    readMessage: protectResolver(async (_, { id }, { loginUserToken }) => {
      const messages = await client.message.findFirst({
        where: {
          id,
          userId: { not: loginUserToken.id },
          room: { users: { some: { id: loginUserToken.id } } },
        },
      });
      if (!messages) {
        return {
          ok: false,
          error: '메세지가 없습니다.',
        };
      }
      await client.message.update({
        where: { id },
        data: {
          read: true,
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
