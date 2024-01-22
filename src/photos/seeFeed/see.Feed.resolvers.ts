import { protectResolver } from '../../users/user.utils';

export default {
  Query: {
    seeFeed: protectResolver(async (_, __, { loginUserToken, client }) => {
      await client.photo.findMany({
        where: {
          OR: [
            {
              user: { followers: { some: { id: loginUserToken.id } } },
            },
            { userId: loginUserToken.id },
          ],
        },
        orderBy: { createAt: 'desc' },
      });
    }),
  },
};