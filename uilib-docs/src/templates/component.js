import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Link from 'gatsby-link';
import classnames from 'classnames';

import './components.scss';
import importantIcon from '../images/important.svg';

export default class ComponentTemplate extends Component {
  static propTypes = {
    pageContext: PropTypes.object
  };

  extractComponentsInfo(component) {
    const splitPattern = /([\s\S]*?):([\s\S]*)/; //eslint-disable-line

    const info = {
      description: _.get(component, 'description.text')
    };

    if (component.docblock) {
      const infoRaw = _.split(component.docblock, '@');
      _.forEach(infoRaw, statement => {
        const match = splitPattern.exec(statement);
        if (statement && match) {
          const key = match[1];
          info[key] = match[2];
        }
      });
    }

    return info;
  }

  renderLink(componentInfo) {
    const {pageContext} = this.props;
    const allComponents = pageContext.components;

    const extendedComponents = _.flow(
      text => _.replace(text, / /g, ''),
      text => _.split(text, ',')
    )(componentInfo.extends);

    return _.map(extendedComponents, (component, index) => {
      const isLast = index === _.size(extendedComponents) - 1;
      const text = `${component}${!isLast ? ', ' : ''}`;
      const extendedComponent = _.find(allComponents, c => c.node.displayName.trim() === component.trim());
      const path = !extendedComponent && componentInfo.extendsLink ? componentInfo.extendsLink : `/docs/${component}`;

      return (
        <span className="inline" key={component}>
          {!extendedComponent && componentInfo.extendsLink ? (
            <a href={componentInfo.extendsLink} rel="noopener noreferrer" target="_blank">
              {text}
            </a>
          ) : (
            <Link to={path}>{text}</Link>
          )}
          {componentInfo.extendsnotes}
          <br />
        </span>
      );
    });
  }

  renderModifiers(componentInfo) {
    const modifiers = _.split(componentInfo.modifiers, ',');

    if (!_.isEmpty(modifiers)) {
      return (
        <div className="modifiers">
          <span className="title">
            Supported <Link to="/foundation/modifiers">Modifiers</Link>
            <span className="tooltip">
              Quick useful props that help with styling your component. Read more at the link.
              {/* Read more about modifiers <Link to="/foundation/modifiers">here</Link>. */}
            </span>
          </span>
          <ul className="modifiers-list">
            {_.map(modifiers, modifier => (
              <li>{modifier}</li>
            ))}
          </ul>
        </div>
      );
    }
  }

  renderExtends(componentInfo, selectedComponent) {
    const extendLinks = this.renderLink(componentInfo);

    if (!_.isEmpty(extendLinks)) {
      return (
        <div className="extend-section">
          <span className="title">
            Extends
            <span className="tooltip">
              {selectedComponent.displayName} support passing these components' props as well.
            </span>
          </span>

          <ul>
            {_.map(extendLinks, link => (
              <li className="link">{link}</li>
            ))}
          </ul>

          {/* {this.renderLink(componentInfo)} */}
          {/* <div>(meaning you can pass the super component's props as well).</div> */}
        </div>
      );
    }
  }

  renderImportant(componentInfo) {
    if (componentInfo.important) {
      return (
        <div alt={''} style={{marginBottom: 10}}>
          {componentInfo.important}
          {componentInfo.importantLink && (
            <a target="_blank" rel="noopener noreferrer" href={componentInfo.importantLink}>
              here
            </a>
          )}
        </div>
      );
    }
  }

  renderNotes(componentInfo) {
    const notes = componentInfo.notes ? componentInfo.notes.split(';') : undefined;
    const shouldRenderNotes = !_.isEmpty(notes) || componentInfo.important;
    if (shouldRenderNotes) {
      return (
        <div className="notes">
          <span className="title">
            <img src={importantIcon} /> Important
          </span>
          {_.map(notes, (note, i) => (
            <div key={i}>{note}</div>
          ))}

          {this.renderImportant(componentInfo)}
        </div>
      );
    }
  }

  renderVisuals(componentInfo) {
    const gifs = componentInfo.gif ? componentInfo.gif.split(',') : [];
    const imgs = componentInfo.image ? componentInfo.image.split(',') : [];
    const visuals = [...gifs, ...imgs];

    if (!_.isEmpty(visuals)) {
      return (
        <div className="visuals">
          {_.map(visuals, (image, i) => {
            return <img key={i} alt={''} src={image} />;
          })}
        </div>
      );
    }
  }

  renderSidebar(componentInfo, componentProps) {
    return (
      <div className="sidebar">
        <TableOfContent props={componentProps} />
        {this.renderVisuals(componentInfo)}
      </div>
    );
  }

  renderComponentPage() {
    const {pageContext} = this.props;
    const href = this.props?.location?.href;
    const selectedComponent = pageContext.componentNode;
    const componentInfo = this.extractComponentsInfo(selectedComponent);
    const componentProps = _.orderBy(_.get(selectedComponent, 'props'), prop => prop.name.toLowerCase());

    const examples = _.split(componentInfo.example, ',');

    const shouldRenderRightPart = componentInfo.modifiers || componentInfo.extends;

    return (
      <div className="docs-page">
        <div className="docs-page__content">
          {this.renderSidebar(componentInfo, componentProps)}

          <div className="component-header">
            <div>
              <h1 className="title inline">{selectedComponent.displayName}</h1>
              {_.map(examples, example => {
                return (
                  <span className="code-example">
                    (
                    <a className="inline" target="_blank" rel="noopener noreferrer" href={example}>
                      code example
                    </a>
                    )
                  </span>
                );
              })}

              <p className="description">{componentInfo.description}</p>
              {this.renderNotes(componentInfo)}
            </div>
            {shouldRenderRightPart && (
              <div>
                {this.renderModifiers(componentInfo)}
                {this.renderExtends(componentInfo, selectedComponent)}
              </div>
            )}
          </div>

          <ComponentAPI props={componentProps} href={href} />
        </div>
      </div>
    );
  }

  render() {
    const isIntro = !_.get(this.props, 'pageContext.componentNode');
    return (
      <div style={{width: '100%'}}>
        {isIntro && (
          <div className="docs-page">
            <div className="docs-page__content">
              <div>Select a component from the left sidebar</div>
            </div>
          </div>
        )}

        {!isIntro && this.renderComponentPage()}
      </div>
    );
  }
}

const ComponentAPI = ({props, href = ''}) => {
  return (
    <div className="component-api">
      <h1>API</h1>
      {_.map(props, prop => {
        const description = _.get(prop, 'description.text');
        const defaultValue = _.get(prop, 'defaultValue.value');
        const isFocused = _.includes(href, `#${prop.name}`);
        const titleClassname = classnames('title', {focused: isFocused});
        return (
          <div className="prop-info">
            <a name={prop.name}>
              <h3 className={titleClassname}>{prop.name}</h3>
            </a>
            <p className="description">{description}</p>
            <p className="type">{_.get(prop, 'type.name')}</p>
            {defaultValue && <p className="default-value">default: {_.get(prop, 'defaultValue.value')}</p>}
          </div>
        );
      })}
    </div>
  );
};

const TableOfContent = ({props}) => {
  return (
    <div className="table-of-content">
      <ul>
        <div className="list-header">Props</div>

        {_.map(props, prop => {
          return (
            <li>
              <a href={`#${prop.name}`}>{prop.name}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
