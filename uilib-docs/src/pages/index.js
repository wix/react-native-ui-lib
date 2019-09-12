import React from 'react';
import Link from 'gatsby-link';

import mainLogo from '../images/logo_big.png';
import './index.scss';
import Layout from '../components/layout';

const IndexPage = (props) => {
  return (
    <Layout {...props}>
      <div className="main-page">
        <div className="logo-box">
          <img className="logo" src={mainLogo} alt="main-logo"/>

          <Link className="docs-button" to="/docs/">
            Enter Docs
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
