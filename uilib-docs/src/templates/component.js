import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Link from 'gatsby-link';

import './components.scss';

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
      const text = <b>{`${component}${!isLast ? ', ' : ''}`}</b>;
      const extendedComponent = _.find(
        allComponents,
        c => c.node.displayName.trim() === component.trim()
      );
      const path =
        !extendedComponent && componentInfo.extendsLink
          ? componentInfo.extendsLink
          : `/docs/${component}`;

      return (
        <span className="inline" key={component}>
          {!extendedComponent && componentInfo.extendsLink ? (
            <a
              href={componentInfo.extendsLink}
              rel="noopener noreferrer"
              target="_blank"
            >
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
    return (
      <img
        key={index}
        alt={''}
        src={image}
        style={{marginRight: 20, width: 320, border: '1px solid black'}}
      />
    );
  }

  renderGif(image, index) {
    return (
      <img
        key={index}
        alt={''}
        src={image}
        style={{marginRight: 20, width: 320}}
      />
    );
  }

  renderImages(images, type) {
    switch (type) {
      case IMAGE_TYPES.GIF:
        return images.map(this.renderGif);
      default:
        return images.map(this.renderImage);
    }
  }

  renderImportant(componentInfo) {
    return (
      <div alt={''} style={{marginBottom: 10}}>
        <span style={{fontWeight: '700'}}>IMPORTANT: </span>{' '}
        {componentInfo.important} &nbsp;
        {componentInfo.importantLink && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={componentInfo.importantLink}
          >
            here
          </a>
        )}
      </div>
    );
  }

  renderNote(note, index) {
    return (
      <div key={index} alt={''} style={{marginBottom: 10}}>
        {note}
      </div>
    );
  }

  renderNotes(notes) {
    return notes.map(this.renderNote);
  }

  renderComponentPage() {
    const {pageContext} = this.props;
    const selectedComponent = pageContext.componentNode;
    const componentInfo = this.extractComponentsInfo(selectedComponent);
    const componentProps = _.orderBy(_.get(selectedComponent, 'props'), prop =>
      prop.name.toLowerCase()
    );
    const gifs = componentInfo.gif ? componentInfo.gif.split(',') : undefined;
    const imgs = componentInfo.image
      ? componentInfo.image.split(',')
      : undefined;
    const notes = componentInfo.notes
      ? componentInfo.notes.split(';')
      : undefined;
      
    const examples = _.split(componentInfo.example, ',');
    return (
      <div className="docs-page">
        <div className="docs-page__content">
          <h1 className="title inline">{selectedComponent.displayName}</h1>
          {_.map(examples, example => {
            return <span className="code-example">
            (
            <a
              className="inline"
              target="_blank"
              rel="noopener noreferrer"
              href={example}
            >
              code example
            </a>
            )
          </span>
          })}

          <h3>{componentInfo.description}</h3>
          {componentInfo.extends && (
            <div>
              Extends: {this.renderLink(componentInfo)}
              <div>
                (meaning you can pass the super component's props as well).
              </div>
            </div>
          )}
          {componentInfo.modifiers && (
            <div>
              <p>
                Supported modifiers: <b>{componentInfo.modifiers}</b>. <br />
                Read more about modifiers{' '}
                <Link to="/foundation/modifiers">here</Link>.
              </p>
            </div>
          )}

          {componentInfo.notes && (
            <div>
              <h4 style={{marginBottom: 10}}>NOTES</h4>
              {this.renderNotes(notes)}
            </div>
          )}
          {componentInfo.important && (
            <div>{this.renderImportant(componentInfo)}</div>
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
                <div className="col-sm-12 text-center">
                  {this.renderImages(imgs, IMAGE_TYPES.PNG)}
                </div>
              </div>
            </div>
          )}

          {gifs && (
            <div className="container">
              <h3>LIVE EXAMPLE</h3>
              <div className="row">
                <div className="col-sm-12 text-center">
                  {this.renderImages(gifs, IMAGE_TYPES.GIF)}
                </div>
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
