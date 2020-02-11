import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from '../containers/landingPage/landingPage';
import Home from '../containers/home/home';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/home" component={Home} />
  </Switch>
)

export default Routes;
