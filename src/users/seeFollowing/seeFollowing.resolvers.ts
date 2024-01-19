import { Resolvers } from '../../types';

export default {
  Query: {
    seeFollowing: async (_, { userName, lastId }, { client }) => {
      const userExists = await client.user.findUnique({
        where: { userName },
        select: { id: true },
      });
      if (!userExists) {
        return {
          ok: false,
          error: '유저가 존재하지 않습니다.',
        };
      }
      const following = await client.user
        .findUnique({ where: { userName } })
        .following({
          take: 5,
          skip: lastId ? 1 : 0,
          cursor: { id: lastId ?? null },
        });

      return {
        ok: true,
        following,
      };
    },
  },
} as Resolvers;
