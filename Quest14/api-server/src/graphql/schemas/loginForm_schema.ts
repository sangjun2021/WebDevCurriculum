import { GraphQLString, GraphQLInputObjectType } from 'graphql';

const loginFormType = new GraphQLInputObjectType({
  name: 'loginForm',
  fields: {
    username: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
  },
});

export default loginFormType;
