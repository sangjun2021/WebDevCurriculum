import {
  GraphQLObjectType, GraphQLList, GraphQLString, GraphQLBoolean,
} from 'graphql';
import postType from './post_schema';
import postsResolver from '../resolvers/posts_resolver';
import postResolver from '../resolvers/post_resolver';

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    username: { type: GraphQLString },
    error: { type: GraphQLBoolean },
    posts: {
      type: new GraphQLList(postType),
      resolve: postsResolver,
    },
    post: {
      type: postType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: postResolver,
    },
  },
});

export default userType;
