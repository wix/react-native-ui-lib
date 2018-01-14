import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import _ from 'lodash';

import './index.scss';

import Navbar from '../components/Navbar';

const Header = () => (
  <div className="header">
    <div className="links">
      <Link to="/">HOME</Link>
      <Link to="/docs/">DOCS</Link>
    </div>
  </div>
);

const TemplateWrapper = ({children, data, location}) => {
  const components = data.allComponentMetadata.edges;
  const inDocs = location.pathname.includes('/docs');
  const filteredComponents = _.chain(components)
      .filter(component => component.node.displayName !== 'IGNORE')
      .sortBy('node.displayName')
      .value();

  console.log('ethan - components', components);
  return (
    <div>
      <Helmet
        title="RNUILIB"
        meta={[
          {name: 'description', content: 'React Native UI Library'},
          {name: 'keywords', content: 'react native, uilib'},
        ]}
      />
      <Header />
      <div className="main">
        {inDocs && (
          <div className="sidebar">
            <Navbar components={filteredComponents} />
          </div>
        )}
        <div className="content">{children()}</div>
      </div>
    </div>
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;

export const query = graphql`
  query LayoutQuery {
    allComponentMetadata {
      edges {
        node {
          displayName
        }
      }
    }
  }
`;
