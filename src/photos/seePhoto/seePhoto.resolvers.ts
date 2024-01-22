import { Resolvers } from '../../types';

export default {
  Query: {
    seePhoto: (_, { id }, { client }) => {
      return client.photo.findUnique({ where: { id } });
    },
  },
} as Resolvers;
