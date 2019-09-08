import React from 'react';
import PropTypes from 'prop-types';
import * as uut from '../DocsGenerator';

class ExampleComponent extends React.Component {
  static displayName = 'ExampleComponent';
  static propTypes = {
    color: PropTypes.string,
    label: PropTypes.string,
    size: PropTypes.number,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    color: 'blue'
  };
}

describe('DocsGenerator Helper', () => {
  it('should extract component info from instance', () => {
    const instance = new ExampleComponent({color: 'red'});
    const componentInfo = uut.extractComponentInfo(instance);
    expect(componentInfo).toEqual({
      componentName: 'ExampleComponent',
      defaultProps: {color: 'blue'},
      props: {color: 'red'}
    });
  });

  it('should generateSnippet handle basic usage with no props', () => {
    const snippet = uut.generateSnippet({componentName: 'ExampleComponent', props: {}, defaultProps: {}});
    expect(snippet).toBe('<ExampleComponent/>');
  });

  it('should generateSnippet handle with string prop', () => {
    const instance = new ExampleComponent({label: 'test'});
    const snippet = uut.generateSnippet(uut.extractComponentInfo(instance));
    expect(snippet).toBe('<ExampleComponent\n    label="test"/>');
  });

  it('should generateSnippet handle with number prop', () => {
    const instance = new ExampleComponent({size: 12});
    const snippet = uut.generateSnippet(uut.extractComponentInfo(instance));
    expect(snippet).toBe('<ExampleComponent\n    size={12}/>');
  });

  it('should generateSnippet handle with boolean prop', () => {
    let instance = new ExampleComponent({disabled: true});
    let snippet = uut.generateSnippet(uut.extractComponentInfo(instance));
    expect(snippet).toBe('<ExampleComponent\n    disabled/>');

    instance = new ExampleComponent({disabled: false});
    snippet = uut.generateSnippet(uut.extractComponentInfo(instance));
    expect(snippet).toBe('<ExampleComponent\n    disabled={false}/>');
  });

  it('should generateSnippet handle with object prop', () => {
    const instance = new ExampleComponent({style: {color: 'red'}});
    const snippet = uut.generateSnippet(uut.extractComponentInfo(instance));
    expect(snippet).toBe('<ExampleComponent\n    style={{"color":"red"}}/>');
  });
});
