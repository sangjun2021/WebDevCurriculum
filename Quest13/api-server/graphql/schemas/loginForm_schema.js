const graphql = require("graphql");

const loginFormType = new graphql.GraphQLInputObjectType({
  name: "loginForm",
  fields: {
    username: {
      type: graphql.GraphQLString,
    },
    password: {
      type: graphql.GraphQLString,
    },
  },
});

module.exports = loginFormType;
