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
            github
          }
        }
      }
    `
  );

  const {pathname} = location;
  const {
    site: {siteMetadata}
  } = data;

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
        <link rel="canonical" href="https://wix.github.io/react-native-ui-lib/" />
        {/* <script
          src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/prism.min.js"
          integrity="sha512-9+422Bs3A87UkWfp+qV80Nfv9arhbCXKY1rxrF2seorI36mIIstMiuBfyKLF1yH1nnzQkEWq2xrzT4XU3Z+vrA=="
          crossorigin="anonymous"
        ></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism-tomorrow.min.css"
          integrity="sha512-vswe+cgvic/XBoF1OcM/TeJ2FW0OofqAVdCZiEYkd6dwGXthvkSFWOoGGJgS2CW70VK5dQM5Oh+7ne47s74VTg=="
          crossorigin="anonymous"
        /> */}
      </Helmet>
      <Header githubDomain={siteMetadata.github} />
      {/* <div className={`main ${!showSidebar ? 'fill' : ''}`}> */}
      <div className={`main`}>
        {showSidebar && <Navbar />}
        <div className={`content ${showSidebar ? 'with-navbar' : ''}`}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
