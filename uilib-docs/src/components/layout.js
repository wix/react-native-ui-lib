import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import _ from 'lodash';

import Header from './header';
import './layout.scss';

const Layout = ({children, navbar, data, location}) => {
  const showSidebar = _.includes(location.href, 'docs');
  return (
    <div className="layout">
      <Helmet
        title="RNUILIB"
        meta={[
          {name: 'description', content: 'React Native UI Library'},
          {name: 'keywords', content: 'react native, uilib'}
        ]}
      />
      <Header/>
      <div className="main">
        {showSidebar && <div className="sidebar">{navbar}</div>}
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  navbar: PropTypes.element,
  children: PropTypes.func
};

export default Layout;
