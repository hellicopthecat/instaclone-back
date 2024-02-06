import client from '../client';
import { Resolvers } from '../types';

export default {
  Photo: {
    user: ({ userId }, __) => {
      return client.user.findUnique({ where: { id: userId } });
    },
    hashtags: ({ id }, __) => {
      return client.hashtag.findMany({ where: { photos: { some: { id } } } });
    },
    totalLikes: async ({ id }, __) =>
      await client.like.count({ where: { photoId: id } }),
    totalComments: async ({ id }, __) =>
      await client.comment.count({ where: { photoId: id } }),
    owner: ({ userId }, __, { loginUserToken }) => {
      if (!loginUserToken) {
        return false;
      } else {
        return userId === loginUserToken.id;
      }
    },
    isLiked: async ({ id }, __, { loginUserToken }) => {
      if (!loginUserToken) {
        return false;
      } else {
        const ok = await client.like.findUnique({
          where: { photoId_userId: { photoId: id, userId: loginUserToken.id } },
          select: { id: true },
        });
        if (ok) {
          return true;
        }
        return false;
      }
    },
    comments: async ({ id }) =>
      client.comment.findMany({
        where: { photoId: id },
        include: { user: true },
      }),
  },
  Hashtag: {
    photos: async ({ id }, { page }) => {
      return await client.hashtag.findUnique({ where: { id } }).photos({
        take: page,
        skip: 10,
      });
    },
    totalPhoto: async ({ id }, __) =>
      await client.photo.count({ where: { hashtags: { some: { id } } } }),
  },
} as Resolvers;
