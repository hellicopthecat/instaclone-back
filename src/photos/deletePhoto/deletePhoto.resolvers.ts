import { protectResolver } from '../../users/user.utils';

export default {
  Mutation: {
    deletePhoto: protectResolver(
      async (_, { id }, { client, loginUserToken }) => {
        const photo = await client.photo.findUnique({
          where: { id },
          select: {
            userId: true,
          },
        });
        if (!photo) {
          return {
            ok: false,
            error: '사진이 없습니다.',
          };
        } else if (photo.userId !== loginUserToken.id) {
          return {
            ok: false,
            error: '권한이 없습니다..',
          };
        } else {
          await client.photo.delete({ where: { id } });
          return {
            ok: true,
          };
        }
      },
    ),
  },
};
