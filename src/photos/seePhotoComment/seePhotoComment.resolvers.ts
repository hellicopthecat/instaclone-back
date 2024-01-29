import client from '../../client';
import { Resolvers } from '../../types';

export default {
  Query: {
    seePhotoComments: async (_, { id }) =>
      await client.comment.findMany({
        where: { photoId: id },
        orderBy: { createAt: 'desc' },
      }),
  },
} as Resolvers;
