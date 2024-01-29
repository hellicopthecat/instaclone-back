import client from '../../client';
import { Resolvers } from '../../types';

export default {
  Query: {
    searchPhotos: async (_, { keyword }) => {
      return await client.photo.findMany({
        where: { caption: { contains: keyword } },
      });
    },
  },
} as Resolvers;
