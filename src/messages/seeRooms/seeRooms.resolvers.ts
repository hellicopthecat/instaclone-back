import client from '../../client';
import { protectResolver } from '../../users/user.utils';

export default {
  Query: {
    seeRoom: protectResolver(async (_, __, { loginUserToken }) => {
      return await client.room.findMany({
        where: { users: { some: { id: loginUserToken.id } } },
      });
    }),
  },
};
