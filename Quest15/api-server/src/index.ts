import express from 'express';
import https from 'https';
import fs from 'fs';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema } from 'graphql';
import controller from './controllers/index';
import query from './graphql/schemas/query';
import mutation from './graphql/schemas/mutation';
import { corsOptionType, httpsOptionType } from './types';

const corsOptions : corsOptionType = {
  origin: 'https://localhost:3001',
  optionsSuccessStatus: 200,
  credentials: true,
};
const schema = new GraphQLSchema({ query, mutation });
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
    context: {
      controller,
    },
  }),
);

const option : httpsOptionType = {
  key: fs.readFileSync(`${__dirname}/../keys/key.pem`, 'utf-8'),
  cert: fs.readFileSync(`${__dirname}/../keys/cert.pem`, 'utf-8'),
};

https.createServer(option, app).listen(443, () => {
  console.log('server is running with https');
});
