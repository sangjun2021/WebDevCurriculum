const graphql = require("graphql");
const postType = require("./post_schema");
const userResolver = require("../resolvers/user_resolver");
const postResolver = require("../resolvers/post_resolver");
const userMutationType = new graphql.GraphQLObjectType({
  name: "CraetePost",
  fields: {
    username: { type: graphql.GraphQLString },
    post: { type: postType, resolve: postResolver },
  },
  args: {
    id: {
      type: graphql.GraphQLString,
    },
  },
});
const mutation = new graphql.GraphQLObjectType({
  name: "Mutaion",
  fields: {
    user: {
      type: userMutationType,
      args: {
        token: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString),
        },
      },
      resolve: userResolver,
    },
  },
});

module.exports = mutation;
