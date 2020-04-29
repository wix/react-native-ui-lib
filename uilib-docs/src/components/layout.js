import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from './header';
import Navbar from '../components/navbar';
import './layout.scss';

const Layout = ({children, showSidebar}) => {
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
      <div className={`main ${!showSidebar ? 'fill' : ''}`}>
        {showSidebar && <Navbar/>}
        <div className={`content ${showSidebar ? 'with-navbar' : ''}`}>{children}</div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  navbar: PropTypes.element,
  children: PropTypes.func
};

export default Layout;
