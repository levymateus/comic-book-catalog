import React from 'react';

import './index.css';
import './app.css';
import TopNavbar from './containers/top-navbar';
import Grid from './containers/grid';
import MetaSearchData from './containers/meta-search';

const App: React.FC = () => (
  <div className="app container-fluid">
    <TopNavbar />
    <MetaSearchData />
    <Grid />
  </div>
);

export default App;
