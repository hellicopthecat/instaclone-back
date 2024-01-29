import client from '../../client';
import { protectResolver } from '../../users/user.utils';
import { makeHashtags } from '../photo.utils';

export default {
  Mutation: {
    editPhoto: protectResolver(
      async (_, { id, caption }, { loginUserToken }) => {
        const oldPhoto = await client.photo.findFirst({
          where: { id, userId: loginUserToken.id },
          include: { hashtags: true },
        });
        if (!oldPhoto) {
          return { ok: false, error: '사진이 없습니다.' };
        }
        const updatePhoto = await client.photo.update({
          where: { id },
          data: {
            caption,
            hashtags: {
              disconnect: oldPhoto.hashtags,
              connectOrCreate: makeHashtags(caption),
            },
          },
        });
        return {
          ok: true,
        };
      },
    ),
  },
};
