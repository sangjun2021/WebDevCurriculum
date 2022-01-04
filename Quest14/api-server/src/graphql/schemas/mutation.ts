import { GraphQLObjectType, GraphQLString } from 'graphql';
import writeResolver from '../resolvers/write_resolver';
import deleteResolver from '../resolvers/delete_resolover';
import postType from './post_schema';
import payLoadType from './payLoad_schema';
import errorType from './error_schema';

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    writeFile: {
      type: postType,
      args: {
        token: {
          type: GraphQLString,
        },
        id: {
          type: GraphQLString,
        },
        payLoad: {
          type: payLoadType,
        },
      },
      resolve: writeResolver,
    },
    deleteFile: {
      type: errorType,
      args: {
        token: {
          type: GraphQLString,
        },
        id: { type: GraphQLString },
      },
      resolve: deleteResolver,
    },
  },
});

export default mutation;
