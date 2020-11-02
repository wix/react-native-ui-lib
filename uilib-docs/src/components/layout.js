import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import _ from 'lodash';

import Header from './header';
import Navbar from '../components/navbar';
import './layout.scss';

const pathPrefix = '/react-native-ui-lib';

const Layout = ({children, location}) => {
  const {pathname} = location;
  const showSidebar = _.replace(pathname, pathPrefix, '') !== '/';

  const metaTitle = 'RNUILib';
  const metaDescription = 'React Native UI Toolset and Components Library';

  return (
    <div className="layout">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{metaTitle}</title>
        <meta name="title" content={metaTitle} />
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="twitter:title" content={metaTitle} />
        <meta property="twitter:description" content={metaDescription} />
        <link
          rel="canonical"
          href="https://wix.github.io/react-native-ui-lib/"
        />
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
