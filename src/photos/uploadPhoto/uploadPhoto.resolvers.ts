import { protectResolver } from '../../users/user.utils';
import { makeHashtags } from '../photo.utils';

export default {
  Mutation: {
    uploadPhoto: protectResolver(
      async (_, { caption, file }, { loginUserToken, client }) => {
        let hashTagObj = [] as any;
        if (caption) {
          hashTagObj = makeHashtags(caption) || [];
        }
        return await client.photo.create({
          data: {
            user: { connect: { id: loginUserToken.id } },
            file,
            caption,
            hashtags: {
              connectOrCreate: hashTagObj,
            },
          },
        });
      },
    ),
  },
};
