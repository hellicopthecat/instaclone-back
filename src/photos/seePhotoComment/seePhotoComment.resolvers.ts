import { Resolvers } from '../../types';

export default {
  Query: {
    seePhotoComments: (_, { id }, { client }) =>
      client.comment.findMany({
        where: { photoId: id },
        orderBy: { createAt: 'desc' },
      }),
  },
} as Resolvers;
