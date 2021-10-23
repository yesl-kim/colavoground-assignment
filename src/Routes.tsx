import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Cart, Menu } from './pages';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Cart} />
        <Route exact path="/menu" component={Menu} />
      </Switch>
    </Router>
  );
}

export default Routes;
