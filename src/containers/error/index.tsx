import React from 'react';

import './index.css';

interface Props {
  errorCode: number;
}

const Error: React.FC<Props> = ({ errorCode }) => {
  const handleErrors = (): React.ReactNode | null => {
    switch (errorCode) {
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
    <div className="d-flex justify-content-center">
      <div className="no-results-box">
        {handleErrors()}
      </div>
    </div>
  );
};

export default Error;
