const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const { Schema } = require('../model/schema');

const app = express();
app.use(cors());
app.get('/', (req, res) => res.redirect('/graphql'));
app.use(
  '/graphql',
  graphqlHTTP(request => ({
    schema: Schema,
    context: request,
    pretty: true,
    graphiql: true,
  }))
);
app.listen(4000);
console.info('Running a GraphQL API server at localhost:4000/graphql');
