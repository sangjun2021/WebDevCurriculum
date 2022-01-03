const { GraphQLBoolean, GraphQLObjectType, GraphQLString } = require("graphql");

const loginType = new GraphQLObjectType({
  name: "login",
  fields: {
    token: {
      type: GraphQLString,
    },
    error: {
      type: GraphQLBoolean,
    },
  },
});

module.exports = loginType;
