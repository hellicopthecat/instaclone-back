import client from '../client';
import { Resolvers } from '../types';

export default {
  Room: {
    users: async ({ id }, __, { loginUserToken }) =>
      await client.room.findUnique({ where: { id } }).users(),
    messages: async ({ id }, __) =>
      await client.message.findMany({ where: { roomId: id } }),
    unReadTotal: async ({ id }, __, { loginUserToken }) =>
      await client.message.count({
        where: {
          read: false,
          roomId: id,
          user: { id: { not: loginUserToken.id } },
        },
      }),
  },
  Message: {
    user: async ({ id }, __) =>
      await client.message.findUnique({ where: { id } }).user(),
  },
} as Resolvers;
