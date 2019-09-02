const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
const port = 4000;

import models from './models'

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const server = new ApolloServer({ typeDefs, resolvers, context: { models, user: { id: 1 } } });

const app = express();

server.applyMiddleware({ app });

models.sequelize.sync({}).then(() => {
  app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  );
}).catch(error => {
  console.log(error.toString())
})

