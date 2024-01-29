import client from '../../client';
import { protectResolver } from '../../users/user.utils';

export default {
  Mutation: {
    toggleLikePhoto: protectResolver(async (_, { id }, { loginUserToken }) => {
      const existsPhoto = await client.photo.findUnique({ where: { id } });
      if (!existsPhoto) {
        return { ok: false, error: '사진을 찾을 수 없습니다.' };
      }
      const like = await client.like.findUnique({
        where: { photoId_userId: { userId: loginUserToken.id, photoId: id } },
      });
      if (like) {
        await client.like.delete({
          where: {
            photoId_userId: { userId: loginUserToken.id, photoId: id },
          },
        });
      } else {
        await client.like.create({
          data: { userId: loginUserToken.id, photoId: id },
        });
      }
      return {
        ok: true,
      };
    }),
  },
};
