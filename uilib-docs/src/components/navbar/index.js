import React, {Component} from 'react';
import {StaticQuery, graphql} from 'gatsby';
import classnames from 'classnames';
import _ from 'lodash';
import fuzzysearch from 'fuzzysearch';

import './index.scss';
import searchIcon from '../../images/search.svg';
import clearIcon from '../../images/delete.svg';
import Item from './item';
import Fab from '../fab';

class Navbar extends Component {
  state = {
    showNavbar: false,
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
        _.last
      )(path);
    }
  };

  getMarkdownPages = data => {
    const {filter} = this.state;
    const markdownPages = data.allFile.edges;
    const pages = _.flow(
      pages => _.map(pages, ({node}) => node.childMarkdownRemark.frontmatter),
      items => _.filter(items, item => fuzzysearch(_.toLower(filter), _.toLower(item.title))),
      items => _.sortBy(items, 'index')
    )(markdownPages);

    return pages;
  };

  getNavbarComponents(data) {
    const components = data.allComponentMetadata.edges;
    const filteredComponents = _.flow(
      components => _.filter(components, component => component.node.displayName !== 'IGNORE'),
      components => _.uniqBy(components, 'node.displayName'),
      components => _.sortBy(components, 'node.displayName')
    )(components);

    return filteredComponents;
  }

  toggleNavbar = value => {
    this.setState({
      showNavbar: _.isBoolean(value) ? value : !this.state.showNavbar
    });
  };

  renderSearch = () => {
    const {filter} = this.state;
    const clearButtonClassName = classnames('clear-button', {
      hidden: _.isEmpty(filter)
    });
    return (
      <div className="search">
        <img src={searchIcon} alt="search" />
        <input placeholder="Search..." onChange={this.setFilter} value={filter} />
        <button className={clearButtonClassName} onClick={this.resetSearch}>
          <img src={clearIcon} alt="clear search" />
        </button>
      </div>
    );
  };

  renderNavbar = data => {
    const currentPage = this.getCurrentPage();
    const {filter, showNavbar} = this.state;
    const markdowns = this.getMarkdownPages(data);
    const components = this.getNavbarComponents(data);
    const componentsByGroups = _.groupBy(components, c => _.split(c.node.displayName, '.')[0]);
    const filteredComponentsByGroups = _.pickBy(componentsByGroups, (group, key) => {
      const groupComponents = [key, ..._.map(group, 'node.displayName')]
      return !!_.find(groupComponents, componentName => fuzzysearch(_.toLower(filter), _.toLower(componentName)))
    });

    const navbarClassName = classnames('navbar', {
      visible: showNavbar
    });

    return (
      <>
        <div className={navbarClassName}>
          {this.renderSearch()}
          <ul>
            {_.map(markdowns, page => {
              return (
                <Item key={page.title} id={page.title} link={page.path} onLinkClick={() => this.toggleNavbar(false)} />
              );
            })}
            {!_.isEmpty(markdowns) && <li className="separator" />}
            {_.map(filteredComponentsByGroups, (components, key) => {
              return (
                <Item
                  key={key}
                  id={key}
                  components={components}
                  currentPage={currentPage}
                  onLinkClick={() => this.toggleNavbar(false)}
                />
              );
            })}
          </ul>
        </div>
        <Fab onClick={this.toggleNavbar}/>
      </>
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
            allFile(
              filter: {
                sourceInstanceName: {eq: "markdown-pages"}
                childMarkdownRemark: {frontmatter: {path: {ne: null}}}
              }
            ) {
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
