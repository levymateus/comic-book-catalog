import React from 'react';

import './index.css';

const NotFound: React.FC = () => (
  <div className="d-flex justify-content-center">
    <div className="no-results-box">
      <h2>Nothing found, try searching again.</h2>
    </div>
  </div>
);

export default NotFound;