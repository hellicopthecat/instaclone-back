import client from '../../client';
import { protectResolver } from '../user.utils';

export default {
  Mutation: {
    unFollowUser: protectResolver(
      async (_, { userName }, { loginUserToken }) => {
        const userExists = await client.user.findUnique({
          where: { userName },
        });
        if (!userExists) {
          return {
            ok: false,
            error: '유저가 존재하지 않습니다.',
          };
        }
        await client.user.update({
          where: { id: loginUserToken.id },
          data: { following: { disconnect: { userName } } },
        });
        return {
          ok: true,
        };
      },
    ),
  },
};
