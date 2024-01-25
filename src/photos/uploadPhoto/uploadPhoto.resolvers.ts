import { uploadS3 } from '../../shared/shared.utils';
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
        const photoFolder = 'photos';
        const fileUrl = await uploadS3(file, loginUserToken, photoFolder);
        return await client.photo.create({
          data: {
            user: { connect: { id: loginUserToken.id } },
            file: fileUrl as string,
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
