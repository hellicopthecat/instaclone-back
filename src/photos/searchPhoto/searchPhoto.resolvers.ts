import { Resolvers } from '../../types';

export default {
  Query: {
    searchPhotos: async (_, { keyword }, { client }) => {
      return await client.photo.findMany({
        where: { caption: { contains: keyword } },
      });
    },
  },
} as Resolvers;
