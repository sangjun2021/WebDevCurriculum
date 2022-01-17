import { GraphQLObjectType, GraphQLBoolean } from 'graphql';

const errorType = new GraphQLObjectType({
  name: 'error',
  fields: {
    error: {
      type: GraphQLBoolean,
    },
  },
});

export default errorType;
