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
import ApolloClient, { gql } from "apollo-boost";

import App from "./App";
import GardenersPage from "./pages/Gardeners";
import QuestionsPage from "./pages/Questions";
import Notfound from "./pages/Notfound";

import * as serviceWorker from "./serviceWorker";

console.log("ENV", process.env.REACT_APP_ANSWERS_SERVER_URL);

const client = new ApolloClient({
  uri: process.env.REACT_APP_ANSWERS_SERVER_URL
  // credentials: "include",

  // fetchOptions: {
  //   mode: "no-cors"
  // }
});

client
  .query({
    query: gql`
      {
        getQuestions {
          Question
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
