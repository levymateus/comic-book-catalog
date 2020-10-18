import React from 'react';

import './index.css';
import './app.css';
import TopNavbar from './containers/top-navbar';
import Grid from './containers/grid';
import MetaSearchData from './containers/meta-search';

const App: React.FC = () => (
  <div id="container" className="app">
    <TopNavbar />
    <MetaSearchData />
    <Grid />
  </div>
);

export default App;
