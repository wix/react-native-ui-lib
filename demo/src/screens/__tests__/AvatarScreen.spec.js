import React from 'react';
import renderer from 'react-test-renderer';

describe('AvatarScreen', () => {
  let AvatarScreen;

  beforeEach(() => {
    AvatarScreen = require('../componentScreens/AvatarsScreen').default;
  });

  it('renders screen', () => {
    const tree = renderer.create(<AvatarScreen/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
