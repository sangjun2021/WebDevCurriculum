const graphql = require("graphql");
const postType = require("./post_schema");
const postsResolver = require("../resolvers/posts_resolver");
const postResolver = require("../resolvers/post_resolver");
const userType = new graphql.GraphQLObjectType({
  name: "User",
  fields: {
    username: { type: graphql.GraphQLString },
    error: { type: graphql.GraphQLBoolean },
    posts: {
      type: new graphql.GraphQLList(postType),
      resolve: postsResolver,
    },
    post: {
      type: postType,
      args: {
        id: { type: graphql.GraphQLString },
      },
      resolve: postResolver,
    },
  },
});

module.exports = userType;
