import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';

const postType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    userId: { type: GraphQLInt },
    error: {
      type: GraphQLBoolean,
    },
  },
});

export default postType;
