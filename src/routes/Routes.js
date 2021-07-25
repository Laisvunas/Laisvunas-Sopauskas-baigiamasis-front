import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

import { Home, Login, Register, Diagrams, Publish, View, Generate } from "../pages";

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <PrivateRoute exact path="/generate" component={Generate} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute exact path="/diagrams" component={Diagrams} />
      <PrivateRoute exact path="/publish/" component={Publish} />
      <PrivateRoute exact path="/publish/:id" component={Publish} />
      <PrivateRoute exact path="/view/" component={View} />
      <PrivateRoute exact path="/view/:id" component={View} />
      <Route path='*' exact={true} component={Login} />
    </Switch>
  </Router>
);

export default Routes;