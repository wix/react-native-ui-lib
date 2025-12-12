import React from 'react';
import renderer, {act} from 'react-test-renderer';

describe('AvatarScreen', () => {
  let AvatarScreen;

  beforeEach(() => {
    AvatarScreen = require('../componentScreens/AvatarsScreen').default;
  });

  it('renders screen', () => {
    let testRenderer;
    act(() => {
      testRenderer = renderer.create(<AvatarScreen/>);
    });
    const tree = testRenderer.toJSON();
    expect(tree).toMatchSnapshot();
    act(() => {
      testRenderer.unmount();
    });
  });
});
