import { Resolvers } from '../../types';
import bcrypt from 'bcrypt';
import { protectResolver } from '../user.utils';

export default {
  Mutation: {
    editProfile: protectResolver(
      async (
        _,
        { firstName, lastName, password, bio, avatar },
        { loginUserToken, client },
      ) => {
        console.log(avatar);
        let hashPw;
        if (password) {
          hashPw = await bcrypt.hash(password, 10);
        }
        const isUpdate = await client.user.update({
          where: { id: loginUserToken.id },
          data: {
            firstName,
            lastName,
            password: hashPw ?? password,
            bio,
            avatar,
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
