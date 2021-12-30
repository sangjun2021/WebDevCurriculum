const graphql = require("graphql");
const userType = require("./user_schema");
const loginFormType = require("./loginForm_schema");
const loginType = require("./login_schema");
const userResolver = require("../resolvers/user_resolver");
const loginResolver = require("../resolvers/login_resolver");
const query = new graphql.GraphQLObjectType({
  name: "Query",
  fields: {
    user: {
      type: userType,
      args: {
        token: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString),
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

module.exports = query;
