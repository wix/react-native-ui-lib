import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from './header';
import Navbar from '../components/navbar';
import './layout.scss';

const Layout = ({children, showSidebar}) => {
  return (
    <div className="layout">
      <Helmet>
        <meta charSet="utf-8" />
        <title>RNUILib</title>
        <meta name="description" content="React Native UI Toolset and Components Library"></meta>
        <link rel="canonical" href="https://wix.github.io/react-native-ui-lib/" />
      </Helmet>
      <Header />
      {/* <div className={`main ${!showSidebar ? 'fill' : ''}`}> */}
      <div className={`main`}>
        {showSidebar && <Navbar />}
        <div className={`content ${showSidebar ? 'with-navbar' : ''}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  navbar: PropTypes.element,
  children: PropTypes.func
};

export default Layout;
