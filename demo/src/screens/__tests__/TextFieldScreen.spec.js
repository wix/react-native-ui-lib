import React from 'react';
import renderer from 'react-test-renderer';

describe('TextField Screen', () => {
  let TextFieldScreen;

  beforeEach(() => {
    TextFieldScreen = require('../componentScreens/TextFieldScreen').default;
  });

  it('renders screen', () => {
    const tree = renderer.create(<TextFieldScreen/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
