import React from 'react';
import {StyleSheet} from 'react-native';
import {render} from '@testing-library/react-native';
import {Avatar} from '../index';

function verifyBadgeSize(renderTree, expectedSize) {
  const badge = renderTree.getByTestId('avatar.onlineBadge');
  const style = StyleSheet.flatten(badge.props.style);
  expect(style.width).toEqual(expectedSize);
  expect(style.height).toEqual(expectedSize);
}

describe('Avatar Badge', () => {
  describe('badgeProps.size supports number', () => {
    it('should return 99 as the size number given', () => {
      const renderTree = render(<Avatar testID={'avatar'} badgeProps={{size: 99}}/>);
      verifyBadgeSize(renderTree, 99);
    });

    it('should return default when passing 0 as size', () => {
      const renderTree = render(<Avatar testID={'avatar'} badgeProps={{size: 0}}/>);
      verifyBadgeSize(renderTree, 10);
    });
  });
});

describe('Avatar Accessibility', () => {
  it('should render with hitSlop when onPress is provided', () => {
    const renderTree = render(<Avatar testID={'avatar'} onPress={() => {}}/>);
    expect(renderTree.toJSON()).toMatchSnapshot();
  });

  it('should not render hitSlop when onPress is not provided', () => {
    const renderTree = render(<Avatar testID={'avatar'}/>);
    expect(renderTree.toJSON()).toMatchSnapshot();
  });
});
