import React, {Component} from 'react';
import {StaticQuery, graphql} from 'gatsby';

import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import _ from 'lodash';

import './index.scss';
import searchIcon from '../../images/search.svg';
import Item from './item';

class Navbar extends Component {
  state = {
    filter: ''
  };

  setFilter = ({target: {value}}) => {
    this.setState({filter: value});
  };

  getCurrentPage = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.href;
      return _.chain(path)
        .split('/')
        .filter(item => !_.isEmpty(item))
        .last()
        .value();
    }
  };

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
    const currentPage = this.getCurrentPage();
    const {filter} = this.state;
    const markdowns = this.getMarkdownPages(data);
    const components = this.getNavbarComponents(data);

    const filteredComponents = _.filter(components, component =>
      _.includes(_.lowerCase(component.node.displayName), _.lowerCase(filter))
    );

    const componentsByGroups = _.groupBy(
      filteredComponents,
      c => _.split(c.node.displayName, '.')[0]
    );

    return (
      <div className="navbar">
        <div className="search">
          <img src={searchIcon} />
          <input placeholder="Search..." onChange={this.setFilter} />
        </div>
        <ul>
          {_.map(markdowns, page => {
            return <Item id={page.title} link={page.path} />;
          })}
          <li className="separator" />
          {_.map(componentsByGroups, (components, key) => {
            return (
              <Item
                id={key}
                components={components}
                currentPage={currentPage}
              ></Item>
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
