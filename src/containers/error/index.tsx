import React from 'react';

import './index.css';

interface Props {
  errorCode: number;
}

const Error: React.FC<Props> = ({ errorCode }) => {
  const handleErrors = (): React.ReactNode | null => {
    switch (errorCode) {
      case 1:
        return <h2>Connection error, please try again.</h2>;
      case 409:
        return <h2>{errorCode} - Sorry! The requested resource is not found!</h2>;
      default:
        return <h2>Sorry! An error has ocurred</h2>;
    }
  };
  if (errorCode === 0) {
    return null;
  }
  return (
    <div className="error-page d-flex justify-content-center align-items-center">
      <div className="no-results-box">
        {handleErrors()}
      </div>
    </div>
  );
};

export default Error;
