import React, {Component} from 'react';
import {StaticQuery, graphql} from 'gatsby';
import classnames from 'classnames';
import _ from 'lodash';

import './index.scss';
import searchIcon from '../../images/search.svg';
import clearIcon from '../../images/delete.svg';
import Item from './item';

class Navbar extends Component {
  state = {
    filter: ''
  };

  setFilter = ({target: {value}}) => {
    this.setState({filter: value});
  };

  resetSearch = () => {
    this.setState({filter: ''});
  };

  getCurrentPage = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.href;

      return _.flow(
        p => _.split(p, '/'),
        items => _.filter(items, i => !_.isEmpty(i)),
        _.last,
      )(path);
    }
  };

  getMarkdownPages(data) {
    const markdownPages = data.allFile.edges;
    const pages = _.flow(pages =>
      _.map(
        pages,
        ({node}) => node.childMarkdownRemark.frontmatter,
        items => _.sortBy(items, 'index')
      )
    )(markdownPages);

    return pages;
  }

  getNavbarComponents(data) {
    const components = data.allComponentMetadata.edges;
    const filteredComponents = _.flow(
      components => _.filter(components, component => component.node.displayName !== 'IGNORE'),
      components => _.uniqBy(components, 'node.displayName'),
      components => _.sortBy(components, 'node.displayName')
    )(components);

    return filteredComponents;
  }

  renderSearch = () => {
    const {filter} = this.state;
    const clearButtonClassName = classnames('clear-button', {
      hidden: _.isEmpty(filter)
    });
    return (
      <div className="search">
        <img src={searchIcon} />
        <input
          placeholder="Search..."
          onChange={this.setFilter}
          value={filter}
        />
        <button className={clearButtonClassName} onClick={this.resetSearch}>
          <img src={clearIcon} />
        </button>
      </div>
    );
  };

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
        {this.renderSearch()}
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
