const { GraphQLInputObjectType, GraphQLString } = require("graphql");
const payLoadType = new GraphQLInputObjectType({
  name: "payLoad",
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

module.exports = payLoadType;
