import React from "react";

import {
  NavLink,
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import {NavWrapper} from './styled-components';

import App from "./App";
import GardenersPage from "./pages/Gardeners";
import QuestionsPage from "./pages/Questions";
import Notfound from "./pages/Notfound";
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
      </ul>
    </NavWrapper>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/gardeners" component={GardenersPage} />
        <Route path="/questions" component={QuestionsPage} />
        <Route component={Notfound} />
      </Switch>
  </Router>

);

export default Routing