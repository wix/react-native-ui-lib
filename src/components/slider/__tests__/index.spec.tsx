import Slider from '../index';

describe('Slider', () => {
  describe('Accessibility', () => {
    it('should have correct hit target size', () => {
      const defaultProps = Slider.defaultProps || {};
      expect(defaultProps.thumbHitSlop).toBe(12);
    });
  });
});
