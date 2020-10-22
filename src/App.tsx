import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './index.css';
import './app.css';
import { Redirect } from 'react-router';
import TopNavbar from './containers/top-navbar';
import Comics from './containers/comics';
import MetaSearchData from './containers/meta-search';
import Comic from './containers/comic';
import { NotFoundPage } from './components/not-found';

export const ComicsPage: React.FC = () => (
  <>
    <MetaSearchData />
    <Comics />
  </>
);

const App: React.FC = () => (
  <div className="app container-fluid">
    <BrowserRouter basename="/">
      <TopNavbar />
      <Switch>
        <Route exact path="/comics" component={ComicsPage} />
        <Route path="/comics/:characters" component={ComicsPage} />
        <Route path="/comic/:id" component={Comic} />
        <Redirect from="/" exact to="/comics" />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
