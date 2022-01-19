const { GraphQLObjectType, GraphQLBoolean } = require("graphql");

const errorType = new GraphQLObjectType({
  name: "error",
  fields: {
    error: {
      type: GraphQLBoolean,
    },
  },
});

module.exports = errorType;
