import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import userType from './user_schema';
import loginType from './login_schema';
import loginFormType from './loginForm_schema';
import userResolver from '../resolvers/user_resolver';
import loginResolver from '../resolvers/login_resolver';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: {
        token: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: userResolver,
    },
    login: {
      type: loginType,
      args: {
        loginForm: {
          type: loginFormType,
        },
      },
      resolve: loginResolver,
    },
  },
});

export default query;
