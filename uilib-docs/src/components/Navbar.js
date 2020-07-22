import React, {Component} from 'react';
import {StaticQuery, graphql} from 'gatsby';

import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import _ from 'lodash';

import './navbar.scss';
import searchIcon from '../images/search.svg';

class Navbar extends Component {
  static propTypes = {
    components: PropTypes.array
  };

  constructor(props) {
    super(props);

    this.setFilter = this.setFilter.bind(this);
  }

  state = {
    filter: ''
  };

  setFilter({target: {value}}) {
    this.setState({filter: value});
  }

  getMarkdownPages(data) {
    const markdownPages = data.allFile.edges;
    const pages = _.chain(markdownPages)
      .map(({node}) => node.childMarkdownRemark.frontmatter)
      .sortBy('index')
      .value();

    return pages;
  }

  getNavbarComponents(data) {
    const components = data.allComponentMetadata.edges;
    const filteredComponents = _.chain(components)
      .filter(component => component.node.displayName !== 'IGNORE')
      .sortBy('node.displayName')
      .value();

    return filteredComponents;
  }

  renderNavbar = data => {
    const {filter} = this.state;
    const markdowns = this.getMarkdownPages(data);
    const components = this.getNavbarComponents(data);

    const filteredComponents = _.filter(components, component =>
      _.includes(_.lowerCase(component.node.displayName), _.lowerCase(filter)));
    return (
      <div className="navbar">
        <div className="search">
          <img src={searchIcon}/>
          <input placeholder="Search..." onChange={this.setFilter}/>
        </div>
        <ul>
          {_.map(markdowns, page => {
            return (
              <li>
                <Link to={page.path}>{page.title}</Link>
              </li>
            );
          })}
          <li className="separator"/>
          {_.map(filteredComponents, (component, index) => {
            return (
              <li key={index}>
                <Link key={component.node.displayName} to={`/docs/${component.node.displayName}/`}>
                  {component.node.displayName}
                  {/* {component.node.isPublic && <span className="public">public</span>} */}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  render() {
    return (
      <StaticQuery
        query={graphql`
          query LayoutQuery {
            allComponentMetadata {
              edges {
                node {
                  displayName
                }
              }
            }
            allFile(filter: {sourceInstanceName: {eq: "markdown-pages"}}) {
              edges {
                node {
                  childMarkdownRemark {
                    frontmatter {
                      index
                      title
                      path
                    }
                  }
                }
              }
            }
          }
        `}
        render={this.renderNavbar}
      />
    );
  }
}

export default Navbar;
