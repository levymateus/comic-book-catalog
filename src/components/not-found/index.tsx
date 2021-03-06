import React from 'react';

import './index.css';

/**
 * Show an styled not found text.
 */
export const NotFound: React.FC = () => (
  <div className="d-flex justify-content-center">
    <div className="no-results-box">
      <h2>Nothing found, try search again.</h2>
    </div>
  </div>
);

export const NotFoundPage: React.FC = () => (
  <div className="page-not-found d-flex justify-content-center align-items-center">
    <div className="no-results-box">
      <h2>404 - Sorry, page Not Found :(</h2>
    </div>
  </div>
);

export default NotFoundPage;
