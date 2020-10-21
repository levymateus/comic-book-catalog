import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './index.css';
import './app.css';
import TopNavbar from './containers/top-navbar';
import Grid from './containers/grid';
import MetaSearchData from './containers/meta-search';
import Comic from './containers/comic';

const App: React.FC = () => (
  <div className="app container-fluid">
    <Router>
      <TopNavbar />
      <Switch>
        <Route exact path="/">
          <Grid />
        </Route>
        <Route exact path="/comics">
          <MetaSearchData />
          <Grid />
        </Route>
        <Route exact path="/comic/:id">
          <Comic />
        </Route>
      </Switch>
    </Router>
  </div>
);

export default App;
