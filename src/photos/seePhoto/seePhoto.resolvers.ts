import client from '../../client';
import { Resolvers } from '../../types';

export default {
  Query: {
    seePhoto: async (_, { id }) => {
      return await client.photo.findUnique({ where: { id } });
    },
  },
} as Resolvers;
