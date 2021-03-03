import React from 'react';
import Link from 'gatsby-link';

import './header.scss';
import logo from '../images/newDesign/headerLogo.svg';

const Header = ({githubDomain}) => {
  return (
    <div className="header">
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>

      <div className="links">
        <Link to="/getting-started/setup">Docs</Link>
        <a target="_blank" rel="noreferrer" href={githubDomain}>
          GitHub
        </a>
      </div>
    </div>
  );
};

export default Header;
