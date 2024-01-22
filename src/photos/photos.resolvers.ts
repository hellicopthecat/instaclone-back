import { Resolvers } from '../types';

export default {
  Photo: {
    user: ({ userId }, _, { client }) => {
      return client.user.findUnique({ where: { id: userId } });
    },
    hashtags: ({ id }, _, { client }) => {
      return client.hashtag.findMany({ where: { photos: { some: { id } } } });
    },
    totalLikes: async ({ id }, _, { client }) =>
      await client.like.count({ where: { photoId: id } }),
  },
  Hashtag: {
    photos: async ({ id }, { page }, { client }) => {
      return await client.hashtag.findUnique({ where: { id } }).photos({
        take: page,
        skip: 10,
      });
    },
    totalPhoto: async ({ id }, _, { client }) =>
      await client.photo.count({ where: { hashtags: { some: { id } } } }),
  },
} as Resolvers;
