import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import _ from 'lodash';
import {graphql, useStaticQuery} from 'gatsby';

import Header from './header';
import Navbar from '../components/navbar';
import './layout.scss';

const Layout = ({children, location}) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            domain
          }
        }
      }
    `);

  const {pathname} = location;
  const {site: {siteMetadata}} = data;
  
  const metaTitle = siteMetadata.title;
  const metaDescription = siteMetadata.description;
  const pathPrefix = `/${siteMetadata.domain}`;
  
  const showSidebar = _.replace(pathname, pathPrefix, '') !== '/';
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
