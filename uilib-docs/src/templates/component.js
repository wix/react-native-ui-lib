import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Link from 'gatsby-link';

import './components.scss';

const IMAGE_TYPES = {
  GIF: 'GIF',
  PNG: 'PNG',
};

export default class ComponentTemplate extends Component {
  static propTypes = {
    pathContext: PropTypes.object,
  };

  extractComponentsInfo(component) {
    const statementPattern = /@\w*\:/; //eslint-disable-line

    const info = {
      description: _.get(component, 'description.text'),
    };

    if (component.docblock) {
      const infoRaw = _.split(component.docblock, '\n');
      _.forEach(infoRaw, (statement) => {
        if (statement && statementPattern.test(statement)) {
          const key = statement.match(statementPattern)[0].slice(1, -1);
          info[key] = statement.split(statementPattern)[1].trim();
        }
      });
    }

    return info;
  }

  renderLink(componentInfo) {
    const link = componentInfo.extendslink;
    if (link) {
      if (link.includes('http')) {
        return (
          <span>
            <a href={componentInfo.extendslink}>
              <b>{componentInfo.extends}</b>
            </a>{' '}
            {componentInfo.extendsnotes}
            <br />
          </span>
        );
      }
      return (
        <span>
          <Link to={componentInfo.extendslink}>
            <b>{componentInfo.extends}</b>
          </Link>{' '}
          {componentInfo.extendsnotes}
          <br />
        </span>
      );
    }
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

  render() {
    const {pathContext} = this.props;
    const selectedComponent = pathContext.component;
    const componentInfo = this.extractComponentsInfo(selectedComponent);
    const componentProps = _.get(selectedComponent, 'props');
    const gifs = componentInfo.gif ? componentInfo.gif.split(',') : undefined;
    const imgs = componentInfo.image ? componentInfo.image.split(',') : undefined;

    return (
      <div className="docs-page">
        <div className="docs-page__content">
          <h1>{selectedComponent.displayName}</h1>
          <h3>{componentInfo.description}</h3>
          {componentInfo.extends && (
            <div>
              Extends: {this.renderLink(componentInfo)}
              (meaning you can pass the super component's props as well).
            </div>
          )}
          {componentInfo.modifiers && (
            <div>
              <p>
                Supported modifiers: <b>{componentInfo.modifiers}</b>. <br />
                Read more about modifiers <Link to="/modifiers/">here</Link>.
              </p>
            </div>
          )}
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

          {componentInfo.example && (
            <div>
              <h3>CODE SAMPLE</h3>
              <p>
                See example{' '}
                <a target="_blank" href={componentInfo.example}>
                  here
                </a>.
              </p>
            </div>
          )}
        </div>
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

          {_.map(props, (prop, index) => (
            <tr key={index}>
              <td>{prop.name}</td>
              <td>{_.get(prop, 'description.text')}</td>
              <td>{_.get(prop, 'type.name')}</td>
              <td>{_.get(prop, 'defaultValue.value')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
