import React from "react";

import {
  NavLink,
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import { NavWrapper } from "./styled-components";

import App from "./App";
import GardenersPage from "./pages/Gardeners";
import QuestionsPage from "./pages/Questions";
import AddQuestionPage from "./pages/AddQuestion";
import Notfound from "./pages/Notfound";
import { InsertAnswer } from "./Components/update-question";
const Routing = () => (
  <Router>
    <NavWrapper>
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
        <li>
          <NavLink activeClassName="active" to="/add-question">
            Add
          </NavLink>
        </li>
      </ul>
    </NavWrapper>
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
      <Route path="/gardeners">
        <GardenersPage />
      </Route>
      <Route path="/questions">
        <QuestionsPage />
      </Route>
      <Route path="/add-question">
        <AddQuestionPage />
      </Route>
      <Route path="/add-question/:questionId">
        <AddQuestionPage>
          <InsertAnswer />
        </AddQuestionPage>
      </Route>
      <Route path="*">
        <Notfound />
      </Route>
    </Switch>
  </Router>
);

export default Routing;
