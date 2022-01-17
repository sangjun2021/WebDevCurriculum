import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from 'graphql';

const loginType = new GraphQLObjectType({
  name: 'login',
  fields: {
    token: {
      type: GraphQLString,
    },
    error: {
      type: GraphQLBoolean,
    },
  },
});

export default loginType;
