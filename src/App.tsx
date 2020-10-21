import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './index.css';
import './app.css';
import { Redirect } from 'react-router';
import TopNavbar from './containers/top-navbar';
import Grid from './containers/grid';
import MetaSearchData from './containers/meta-search';
import Comic from './containers/comic';

const App: React.FC = () => (
  <div className="app container-fluid">
    <BrowserRouter basename="/">
      <TopNavbar />
      <Switch>
        <Route exact path="/comics">
          <MetaSearchData />
          <Grid />
        </Route>
        <Route exact path="/comics/:characters">
          <MetaSearchData />
          <Grid />
          <div>teste</div>
        </Route>
        <Route exact path="/comic/:id">
          <Comic />
        </Route>
        <Redirect from="/" exact to="/comics" />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
