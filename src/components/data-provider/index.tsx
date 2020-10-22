import React from 'react';

import './index.css';

const DataProvider: React.FC = ({ children }) => (
  <div className="data-provided">
    {children}
  </div>
);

export default DataProvider;
