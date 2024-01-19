import { protectResolver } from '../user.utils';

export default {
  Mutation: {
    followUser: protectResolver(
      async (_, { userName }, { loginUserToken, client }) => {
        const existsUser = await client.user.findUnique({
          where: { userName },
        });
        if (!existsUser) {
          return {
            ok: false,
            error: '사용자가 없습니다.',
          };
        }
        await client.user.update({
          where: { id: loginUserToken.id },
          data: { following: { connect: { userName } } },
        });
        return {
          ok: true,
        };
      },
    ),
  },
};
