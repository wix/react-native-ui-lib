import React from 'react';
import View from '../index';
import {render} from '@testing-library/react-native';
import _ from 'lodash';

const TestCase = (props) => {
  return <View {...props}/>;
};

describe('Style', () => {
  it('Should have background color', () => {
    const renderTree = render(<TestCase backgroundColor={'blue'} testID={'test-view'}/>);
    const view = renderTree.getByTestId('test-view');
    const style = view.props.style;
    expect(style).toContainEqual({backgroundColor: 'blue'});
  });
});
