const { GraphQLString, GraphQLInputObjectType } = require("graphql");

const loginFormType = new GraphQLInputObjectType({
  name: "loginForm",
  fields: {
    username: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
  },
});

module.exports = loginFormType;
