const graphql = require("graphql");

const loginType = new graphql.GraphQLObjectType({
  name: "login",
  fields: {
    token: {
      type: graphql.GraphQLString,
    },
    error: {
      type: graphql.GraphQLBoolean,
    },
  },
});

module.exports = loginType;
