import React from 'react';
import logo from '../images/logo.svg';

const Loader = () => {
  return (
    <div className="loader">
      <img src={logo} className="loader-logo" alt="logo" />
    </div>
  )
}

export default Loader;
