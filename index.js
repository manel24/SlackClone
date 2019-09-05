const express = require('express');
const { ApolloServer } = require('apollo-server-express');
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const port = 4000;
const SECRET = 'verysecret';
const SECRET2 = 'verysecret2';
import models from './models';

import { refreshTokens } from './auth';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => ({ models, user: req.user, SECRET, SECRET2 }) });

const app = express();
app.use(cors('*'));

const addUser = async (req, res, next) => {
  const token = req.headers['x-token'];
  try {
    const { user } = jwt.verify(token, SECRET);
    req.user = user;
  } catch (error) {
    const refreshToken = req.headers['x-refresh-token'];
    const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
    if (newTokens.token && newTokens.refreshToken) {
      res.set('Access-Control-Expose-Headers', 'x-token', 'x-refresh-token');
      res.set('x-token', newTokens.token);
      res.set('x-refresh-token', newTokens.refreshToken);
    }
    req.user = newTokens.user;
  }
  next();
};

app.use(addUser);

server.applyMiddleware({ app });


models.sequelize.sync({}).then(() => {
  app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  );
}).catch(error => {
  console.log(error.toString())
})

