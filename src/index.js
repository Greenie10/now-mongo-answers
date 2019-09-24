import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";

import Routing from './routing'

import "semantic-ui-css/semantic.min.css";
import "./index.css";


import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from "apollo-client";

import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

const cache = new InMemoryCache();
const link = new HttpLink({
  // this env is not getting picked up on production
  // have to revert to hard coding uri
  // uri: process.env.REACT_APP_ANSWERS_SERVER_URI
  uri: "https://answers-server.lollymay.now.sh/"
  // uri: "http://localhost:4000/"
});

const client = new ApolloClient({
  cache,
  link
});

const appWrapper = (
  <ApolloProvider client={client}>
    <Routing />
  </ApolloProvider>

);

ReactDOM.render(appWrapper, document.getElementById("root"));
serviceWorker.unregister();
