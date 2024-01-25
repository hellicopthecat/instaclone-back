import { protectResolver } from '../../users/user.utils';

export default {
  Mutation: {
    createComment: protectResolver(
      async (_, { photoId, payload }, { loginUserToken, client }) => {
        const ok = await client.photo.findUnique({
          where: { id: photoId },
          select: { id: true },
        });
        if (!ok) {
          return { ok: false, error: '사진을 불러올수없습니다.' };
        }
        await client.comment.create({
          data: {
            payload,
            photo: { connect: { id: photoId } },
            user: { connect: { id: loginUserToken.id } },
          },
        });
      },
    ),
  },
};
