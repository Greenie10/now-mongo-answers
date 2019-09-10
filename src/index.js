import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import {
  NavLink,
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";

import App from "./App";
import GardenersPage from "./pages/Gardeners";
import QuestionsPage from "./pages/Questions";
import Notfound from "./pages/Notfound";

import * as serviceWorker from "./serviceWorker";

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

client
  .query({
    query: gql`
      query TestQuery {
        getQuestions {
          Location
        }
      }
    `
  })
  .then(result => console.log("*** RESULT ***", result));

const routing = (
  <Router>
    <div>
      <ul>
        <li>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/gardeners">
            Gardeners
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/questions">
            Questions
          </NavLink>
        </li>
      </ul>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/gardeners" component={GardenersPage} />
        <Route path="/questions" component={QuestionsPage} />
        <Route component={Notfound} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
serviceWorker.unregister();
