import client from '../../client';
import { Resolvers } from '../../types';

export default {
  Query: {
    seeHashtag: async (_, { hashtag }) => {
      return await client.hashtag.findUnique({ where: { hashtag } });
    },
  },
} as Resolvers;
