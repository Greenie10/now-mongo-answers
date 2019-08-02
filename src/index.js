import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import GardenersPage from "./pages/Gardeners";

import * as serviceWorker from "./serviceWorker";

const routing = (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/gardeners">Gardeners</Link>
        </li>
      </ul>
      <Route path="/gardeners" component={GardenersPage} />
      <Route path="/" component={App} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
