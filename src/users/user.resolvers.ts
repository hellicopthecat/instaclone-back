import { Resolvers } from '../types';

export default {
  User: {
    totalFollowing: async ({ id }, _, { client }) => {
      return await client.user.count({
        where: { followers: { some: { id } } },
      });
    },
    totalFollowers: async ({ id }, _, { client }) => {
      return await client.user.count({
        where: { following: { some: { id } } },
      });
    },
    isMe: ({ id }, _, { loginUserToken }) => {
      if (!loginUserToken.id) {
        return false;
      }
      return id === loginUserToken.id;
    },
    isFollowing: async ({ id }, _, { loginUserToken, client }) => {
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
    photos: ({ id }, _, { client }) =>
      client.user.findUnique({ where: { id } }).photos(),
  },
} as Resolvers;
