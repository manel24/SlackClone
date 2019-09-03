import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Routes from './routes';
import Home from './components/Home/Home'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

const App = () => (
  <ApolloProvider client={client}>
    <Home />
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
