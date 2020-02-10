import React from 'react';
import Link from 'gatsby-link';

import './header.scss';
import logo from '../images/logo.png';

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <img className="logo" src={logo} alt="logo"/>
        <span className="logo-title">RNUILIB</span>
      </Link>


      <div className="links">
        <Link to="/docs/">Docs</Link>
        <a target="_blank" href="https://github.com/wix/react-native-ui-lib">
          GitHub
        </a>
        <a target="_blank" href="https://github.com/wix/react-native-ui-lib/wiki">
          Wiki
        </a>
      </div>
    </div>
  );
};

export default Header;
