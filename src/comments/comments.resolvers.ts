import { Resolvers } from '../types';

export default {
  Comment: {
    owner: ({ userId }, __, { loginUserToken }) => {
      if (!loginUserToken) {
        return false;
      } else {
        return userId === loginUserToken.id;
      }
    },
  },
} as Resolvers;
