import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import './index.scss';

const Header = () => (
  <div className="header">
    <div>
      <h1 style={{margin: 0}}>
        <Link to="/">{'<RNUILIB/>'}</Link>
      </h1>
    </div>
    <div>
      <Link to="/docs/">DOCS</Link>
    </div>
  </div>
);

const TemplateWrapper = ({children}) => (
  <div>
    <Helmet
      title="RNUILIB"
      meta={[{name: 'description', content: 'Sample'}, {name: 'keywords', content: 'sample, something'}]}
    />
    <Header />
    <div className="main">{children()}</div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
