import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Link from 'gatsby-link';

import './components.scss';
import importantIcon from '../images/important.svg';

const IMAGE_TYPES = {
  GIF: 'GIF',
  PNG: 'PNG'
};

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

  renderImage(image, index) {
    return <img key={index} alt={''} src={image} style={{marginRight: 20, width: 320, border: '1px solid black'}} />;
  }

  renderGif(image, index) {
    return <img key={index} alt={''} src={image} style={{marginRight: 20, width: 320}} />;
  }

  renderImages(images, type) {
    switch (type) {
      case IMAGE_TYPES.GIF:
        return images.map(this.renderGif);
      default:
        return images.map(this.renderImage);
    }
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

  renderComponentPage() {
    const {pageContext} = this.props;
    const selectedComponent = pageContext.componentNode;
    const componentInfo = this.extractComponentsInfo(selectedComponent);
    const componentProps = _.orderBy(_.get(selectedComponent, 'props'), prop => prop.name.toLowerCase());
    const gifs = componentInfo.gif ? componentInfo.gif.split(',') : undefined;
    const imgs = componentInfo.image ? componentInfo.image.split(',') : undefined;
    const examples = _.split(componentInfo.example, ',');

    const shouldRenderRightPart = componentInfo.modifiers || componentInfo.extends;

    return (
      <div className="docs-page">
        <div className="docs-page__content">
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

          {componentProps.length > 0 && (
            <div>
              <h3>PROPS</h3>
              <Props props={componentProps} />
            </div>
          )}

          {imgs && (
            <div className="container">
              <h3>EXAMPLE</h3>
              <div className="row">
                <div className="col-sm-12 text-center">{this.renderImages(imgs, IMAGE_TYPES.PNG)}</div>
              </div>
            </div>
          )}

          {gifs && (
            <div className="container">
              <h3>LIVE EXAMPLE</h3>
              <div className="row">
                <div className="col-sm-12 text-center">{this.renderImages(gifs, IMAGE_TYPES.GIF)}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  render() {
    const isIntro = !_.get(this.props, 'pageContext.componentNode');
    return (
      <div>
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

const Props = ({props}) => {
  return (
    <div className="component-props">
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>description</th>
            <th>type</th>
            <th>default</th>
          </tr>

          {_.map(props, (prop, index) => {
            const description = _.get(prop, 'description.text');
            if (description) {
              return (
                <tr key={index}>
                  <td>{prop.name}</td>
                  <td>{description}</td>
                  <td>{_.get(prop, 'type.name')}</td>
                  <td>{_.get(prop, 'defaultValue.value')}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};
