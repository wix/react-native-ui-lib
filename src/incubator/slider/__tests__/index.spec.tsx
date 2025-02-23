import React from 'react';
import Slider from '../index';
import {render} from '@testing-library/react-native';

describe('Slider', () => {
  describe('Accessibility', () => {
    it('should have correct default hit target size', () => {
      const {getByTestId} = render(<Slider testID="slider"/>);
      const element = getByTestId('slider');
      expect(element.props.thumbHitSlop).toBe(12);
    });
  });
});
