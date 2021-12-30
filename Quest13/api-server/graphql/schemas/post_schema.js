const graphql = require("graphql");

const postType = new graphql.GraphQLObjectType({
  name: "Post",
  fields: {
    id: { type: graphql.GraphQLString },
    title: { type: graphql.GraphQLString },
    text: { type: graphql.GraphQLString },
    userId: { type: graphql.GraphQLInt },
    error: {
      type: graphql.GraphQLBoolean,
    },
  },
});

module.exports = postType;
