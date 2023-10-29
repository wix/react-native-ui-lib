import React from 'react';
import View from '../index';
import {render} from '@testing-library/react-native';
import {ViewDriver} from '../View.driver.new';

const TEST_ID = 'test-view';

const TestCase = props => {
  return <View {...props}/>;
};

describe('Style', () => {
  it('Should have background color', () => {
    const renderTree = render(<TestCase backgroundColor={'blue'} testID={TEST_ID}/>);
    const viewDriver = ViewDriver({renderTree, testID: TEST_ID});
    const style = viewDriver.getStyle();
    expect(style).toContainEqual({backgroundColor: 'blue'});
  });
});
