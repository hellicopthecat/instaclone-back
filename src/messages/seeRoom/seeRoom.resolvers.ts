import client from '../../client';
import { protectResolver } from '../../users/user.utils';

export default {
  Query: {
    seeRoom: protectResolver(async (_, { id }, { loginUserToken }) => {
      return await client.room.findFirst({
        where: { id, users: { some: { id: loginUserToken.id } } },
      });
    }),
  },
};
