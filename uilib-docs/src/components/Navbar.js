import React, {Component} from 'react';
import Link from 'gatsby-link';
import _ from 'lodash';

import './Navbar.scss';

const Navbar = ({components, onItemClick, data}) => {
  return (
    <div className="navbar">
      <ul>
        {_.map(components, (component, index) => {
          return (
            <li key={index}>
              <Link to={`/docs/${component.node.displayName}/`}>{component.node.displayName}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Navbar;
