const express = require("express");
const https = require("https");
const http = require("http");
const fs = require("fs");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const graphql = require("graphql");
const corsOptions = {
  origin: "https://localhost:3001",
  optionsSuccessStatus: 200,
  credentials: true,
};
const query = require("./graphql/schemas/query");
const mutation = require("./graphql/schemas/mutation");
const schema = new graphql.GraphQLSchema({ query, mutation });
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

const option = {
  key: fs.readFileSync(__dirname + "/keys/key.pem", "utf-8"),
  cert: fs.readFileSync(__dirname + "/keys/cert.pem", "utf-8"),
};

https.createServer(option, app).listen(441, () => {
  console.log("server is running with https");
});
