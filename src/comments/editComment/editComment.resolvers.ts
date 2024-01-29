import client from '../../client';
import { protectResolver } from '../../users/user.utils';

export default {
  Mutation: {
    editComment: protectResolver(
      async (_, { id, payload }, { loginUserToken }) => {
        const existsComment = await client.comment.findUnique({
          where: { id },
          select: { userId: true },
        });
        if (!existsComment) {
          return {
            ok: false,
            error: '해당 댓글은 존재하지 않습니다.',
          };
        } else if (existsComment.userId !== loginUserToken.id) {
          return {
            ok: false,
            error: '권한이 없습니다.',
          };
        } else {
          await client.comment.update({ where: { id }, data: { payload } });
        }
        return {
          ok: true,
        };
      },
    ),
  },
};
