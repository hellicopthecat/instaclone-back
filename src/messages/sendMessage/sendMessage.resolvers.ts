import client from '../../client';
import { NEW_MESSAGE } from '../../constants';
import pubsub from '../../pubsub';
import { protectResolver } from '../../users/user.utils';

export default {
  Mutation: {
    sendMessage: protectResolver(
      async (_, { payload, roomId, userId }, { loginUserToken }) => {
        let room = null;
        if (userId) {
          const user = await client.user.findUnique({ where: { id: userId } });
          if (!user) {
            return {
              ok: false,
              error: '유저가 존재하지 않습니다.',
            };
          }
          room = await client.room.create({
            data: {
              users: { connect: [{ id: userId }, { id: loginUserToken.id }] },
            },
          });
        } else if (roomId) {
          room = await client.room.findUnique({
            where: { id: roomId },
            select: { id: true },
          });
          if (!room) {
            return {
              ok: false,
              error: '대화방이 존재하지 않습니다.',
            };
          }
        }
        const createMsg = await client.message.create({
          data: {
            payload,
            room: { connect: { id: room?.id } },
            user: { connect: { id: loginUserToken.id } },
          },
        });
        pubsub.publish(NEW_MESSAGE, { roomUpdates: { ...createMsg } });
        return {
          ok: true,
        };
      },
    ),
  },
};
