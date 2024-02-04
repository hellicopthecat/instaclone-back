import client from '../../client';
import { protectResolver } from '../user.utils';

export default {
  Query: {
    seeMyProfile: protectResolver(
      async (_, __, { loginUserToken }) =>
        await client.user.findUnique({ where: { id: loginUserToken.id } }),
    ),
  },
};
