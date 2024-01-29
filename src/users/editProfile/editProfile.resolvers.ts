import { Resolvers } from '../../types';
import bcrypt from 'bcrypt';
import { protectResolver } from '../user.utils';
import { uploadS3 } from '../../shared/shared.utils';
import client from '../../client';
// import fs from 'fs';

export default {
  Upload: require('graphql-upload-ts').GraphQLUpload,
  Mutation: {
    editProfile: protectResolver(
      async (
        _,
        { firstName, lastName, password, bio, avatar },
        { loginUserToken },
      ) => {
        let avatarUrl = null;
        const avatarFolder = 'avatars';
        if (avatar) {
          // const { filename, createReadStream } = await avatar;
          // const newFileName = `${loginUserToken.userName}_${Date.now()}_${filename}`;
          // const readStream = createReadStream();
          // const writeStream = fs.createWriteStream(
          //   process.cwd() + '/uploads/' + newFileName,
          // );
          // readStream.pipe(writeStream);
          // avatarUrl = `http://localhost:4000/static/${newFileName}`;
          avatarUrl = await uploadS3(avatar, loginUserToken, avatarFolder);
        }
        let hashPw;
        if (password) {
          hashPw = await bcrypt.hash(password, 10);
        }
        const isUpdate = await client.user.update({
          where: { id: loginUserToken.id },
          data: {
            firstName,
            lastName,
            password: hashPw,
            bio,
            avatar: avatarUrl,
          },
        });
        if (isUpdate) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: '프로필을 업데이트 할 수 없습니다.',
          };
        }
      },
    ),
  },
} as Resolvers;
