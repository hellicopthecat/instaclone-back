import { Resolvers } from '../../types';

export default {
  Query: {
    seeHashtag: async (_, { hashtag }, { client }) => {
      return await client.hashtag.findUnique({ where: { hashtag } });
    },
  },
} as Resolvers;
