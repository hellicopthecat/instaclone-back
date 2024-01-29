import client from '../../client';
import { protectResolver } from '../../users/user.utils';

export default {
  Mutation: {
    deleteComment: protectResolver(async (_, { id }, { loginUserToken }) => {
      const comment = await client.comment.findUnique({
        where: { id },
        select: {
          userId: true,
        },
      });
      if (!comment) {
        return {
          ok: false,
          error: '사진이 없습니다.',
        };
      } else if (comment.userId !== loginUserToken.id) {
        return {
          ok: false,
          error: '권한이 없습니다..',
        };
      } else {
        await client.comment.delete({ where: { id } });
        return {
          ok: true,
        };
      }
    }),
  },
};
