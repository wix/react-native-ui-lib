import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Link from 'gatsby-link';
import classnames from 'classnames';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
      const infoRaw = _.split(component.docblock, /(^@|\n@)/);
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
          {extendedComponent && componentInfo.extendsLink ? (
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
    const modifiers = componentInfo.modifiers ? _.split(componentInfo.modifiers, ',') : [];

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
              <li className="link" key={link}>
                {link}
              </li>
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
            <img src={importantIcon} alt="important" /> Important
          </span>
          {_.map(notes, (note, i) => (
            <div key={i}>{note}</div>
          ))}

          {this.renderImportant(componentInfo)}
        </div>
      );
    }
  }

  renderVisuals(componentInfo, forMobile) {
    const gifs = componentInfo.gif ? componentInfo.gif.split(',') : [];
    const imgs = componentInfo.image ? componentInfo.image.split(',') : [];
    const visuals = [...imgs, ...gifs];
    const useAutoPlay = imgs?.length > 0;

    if (!_.isEmpty(visuals)) {
      return (
        <div className={classnames('visuals', {mobile: forMobile})}>
          {forMobile ? <h3>Showcase</h3> : <div className="list-header">Showcase</div>}
          <div className="carousel">
            <Slider arrows dots infinite autoplay={useAutoPlay}>
              {_.map(visuals, (image, i) => {
                return <img key={i} alt={''} src={image} />;
              })}
            </Slider>
          </div>
        </div>
      );
    }
  }

  renderSidebar(componentInfo, componentProps) {
    return (
      <div className="sidebar">
        {this.renderVisuals(componentInfo)}
        <TableOfContent props={componentProps} />
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
              <h2 className="title inline">{selectedComponent.displayName}</h2>
              {_.map(examples, example => {
                return (
                  <span key={example} className="code-example">
                    (
                    <a className="inline" target="_blank" rel="noopener noreferrer" href={example}>
                      code example
                    </a>
                    )
                  </span>
                );
              })}

              <p className="description">{componentInfo.description}</p>
            </div>
            {shouldRenderRightPart && (
              <div>
                {this.renderModifiers(componentInfo)}
                {this.renderExtends(componentInfo, selectedComponent)}
              </div>
            )}
          </div>

          {this.renderNotes(componentInfo)}

          {this.renderVisuals(componentInfo, true)}
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
      <h3>API</h3>
      {_.map(props, prop => {
        const description = _.get(prop, 'description.text');
        const defaultValue = _.get(prop, 'defaultValue.value');
        const isFocused = _.includes(href, `#${prop.name}`);
        const titleClassname = classnames('title', {focused: isFocused});
        return (
          <div key={prop.name} className="prop-info">
            <a name={prop.name}>
              <h5 className={titleClassname}>{prop.name}</h5>
            </a>
            <p className="description default-size">{description}</p>
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
            <li key={prop.name}>
              <a href={`#${prop.name}`}>{prop.name}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
