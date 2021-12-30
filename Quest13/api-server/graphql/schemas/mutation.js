const { GraphQLObjectType, GraphQLString } = require("graphql");
const writeResolver = require("../resolvers/write_resolver");
const deleteResolver = require("../resolvers/delete_resolover");
const postType = require("./post_schema");
const payLoadType = require("./payLoad_schema");
const errorType = require("./error_schema");
const mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    writeFile: {
      type: postType,
      args: {
        token: {
          type: GraphQLString,
        },
        id: {
          type: GraphQLString,
        },
        payLoad: {
          type: payLoadType,
        },
      },
      resolve: writeResolver,
    },
    deleteFile: {
      type: errorType,
      args: {
        token: {
          type: GraphQLString,
        },
        id: { type: GraphQLString },
      },
      resolve: deleteResolver,
    },
  },
});

module.exports = mutation;
