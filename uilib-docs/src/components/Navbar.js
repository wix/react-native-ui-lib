import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import _ from 'lodash';

import './Navbar.scss';

class Navbar extends Component {
  static propTypes = {
    components: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.setFilter = this.setFilter.bind(this);
  }

  state = {
    filter: '',
  };

  setFilter({target: {value}}) {
    this.setState({filter: value});
  }

  render() {
    const {filter} = this.state;
    const {components} = this.props;
    const filteredComponents = _.filter(components, component => _.includes(_.lowerCase(component.node.displayName), _.lowerCase(filter)));
    return (
      <div className="navbar">
        <div className="search">
          <input placeholder="Search..." onChange={this.setFilter} />
        </div>
        <ul>
          {_.map(filteredComponents, (component, index) => {
            return (
              <li key={index}>
                <Link key={component.node.displayName} to={`/docs/${component.node.displayName}/`}>
                  {component.node.displayName}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Navbar;
