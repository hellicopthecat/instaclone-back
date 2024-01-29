import { withFilter } from 'graphql-subscriptions';
import { NEW_MESSAGE } from '../../constants';
import pubsub from '../../pubsub';
import { Resolver, Resolvers } from '../../types';
import client from '../../client';

interface IRoomUpdate {
  [key: string]: {
    id: number;
    createAt: string;
    updatedAt: string;
    payload: string;
    userId: number;
    roomId: number;
    read: boolean;
  };
}
interface IVariable {
  id: number;
}

export default {
  Subscription: {
    roomUpdates: {
      subscribe: async (root, args, context, info) => {
        const roomExists = await client.room.findFirst({
          where: {
            id: args.id,
            users: { some: { id: context.loginUserToken.id } },
          },
          select: { id: true },
        });
        if (!roomExists) {
          throw new Error('대화방이 없어 볼 수 없습니다.');
        }
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          (payload: IRoomUpdate, variable: IVariable, { loginUserToken }) => {
            return payload.roomUpdates.roomId === variable.id;
          },
        )(root, args, context, info);
      },
    },
  } as Resolvers,
};
