import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './index.css';
import './app.css';
import TopNavbar from './containers/top-navbar';
import Grid from './containers/grid';
import MetaSearchData from './containers/meta-search';

const App: React.FC = () => (
  <div className="app container-fluid">
    <TopNavbar />
    <MetaSearchData />
    <Router>
      <Switch>
        <Route exact path="/">
          <Grid />
        </Route>
        <Route exact path="/comics">
          <Grid />
        </Route>
      </Switch>
    </Router>
  </div>
);

export default App;
