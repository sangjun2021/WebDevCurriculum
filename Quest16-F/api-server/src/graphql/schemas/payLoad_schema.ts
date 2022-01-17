import { GraphQLInputObjectType, GraphQLString } from 'graphql';

const payLoadType = new GraphQLInputObjectType({
  name: 'payLoad',
  fields: {
    id: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
    text: {
      type: GraphQLString,
    },
  },
});

export default payLoadType;
