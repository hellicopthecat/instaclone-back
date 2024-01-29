import client from '../client';
import { Resolvers } from '../types';

export default {
  User: {
    totalFollowing: async ({ id }, __) => {
      return await client.user.count({
        where: { followers: { some: { id } } },
      });
    },
    totalFollowers: async ({ id }, __) => {
      return await client.user.count({
        where: { following: { some: { id } } },
      });
    },
    isMe: ({ id }, __, { loginUserToken }) => {
      if (!loginUserToken.id) {
        return false;
      }
      return id === loginUserToken.id;
    },
    isFollowing: async ({ id }, __, { loginUserToken }) => {
      if (!loginUserToken.id) {
        return false;
      }
      const userExists = await client.user
        .findUnique({
          where: { userName: loginUserToken.userName },
        })
        .following({ where: { id } });
      return userExists?.length !== 0;
    },
    photos: ({ id }, __) => client.user.findUnique({ where: { id } }).photos(),
  },
} as Resolvers;
