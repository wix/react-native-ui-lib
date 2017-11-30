import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './docs.scss';

class Docs extends Component {
  state = {
    selectedComponentIndex: 0,
  };

  extractComponentsInfo(component) {
    const statementPattern = /@.*\:/; //eslint-disable-line

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
  }

  render() {
    const {selectedComponentIndex} = this.state;
    const {data} = this.props;
    const components = data.allComponentMetadata.edges;
    const selectedComponent = components[selectedComponentIndex].node;
    const componentInfo = this.extractComponentsInfo(selectedComponent);
    const componentsDescription = _.get(selectedComponent, 'description.text');
    const componentProps = _.get(selectedComponent, 'props');
    return (
      <div className="docs-page">
        <Navbar components={components} onItemClick={index => this.setState({selectedComponentIndex: index})} />
        <div className="docs-page__content">
          <h1>{selectedComponent.displayName}</h1>
          <p>{componentsDescription}</p>
          <p>{selectedComponent.docblock}</p>
          <h3>PROPS</h3>
          <Props props={componentProps} />
        </div>
      </div>
    );
  }
}

const Navbar = ({components, onItemClick}) => {
  return (
    <div className="navbar">
      <ul>
        {_.map(components, (component, index) => {
          return (
            <li onClick={() => onItemClick(index)} key={index}>
              {component.node.displayName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Props = ({props}) => {
  return (
    <div className="component-props">
      <table>
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
      </table>
    </div>
  );
};

export default Docs;

export const query = graphql`
  query DocsQuery {
    allComponentMetadata {
      edges {
        node {
          displayName
          docblock
          description {
            text
          }
          props {
            name
            type {
              name
            }
            description {
              text
            }
            defaultValue {
              value
            }
          }
        }
      }
    }
  }
`;
