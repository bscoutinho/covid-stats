import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import { FaGlobe, FaUserCircle } from "react-icons/fa";

import Overview from "./components/overview/Overview";
import Volunteer from "./components//volunteer/Volunteer";

import "./App.css";

import Logo from "./Logo.js";

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="menu">
          <div className="link">
            <Logo />
          </div>

          <NavLink to="/" exact className="link" activeClassName="active">
            <FaGlobe className="icon" />
            <span className="title-menu">Overview</span>
          </NavLink>

          <NavLink to="/volunteer" className="link" activeClassName="active">
            <FaUserCircle className="icon" />
            <span className="title-menu">Volunteer</span>
          </NavLink>
        </nav>

        <div className="main-app">
          <Switch>
            <Route exact path="/">
              <Overview />
            </Route>
            <Route exact path="/volunteer">
              <Volunteer />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
