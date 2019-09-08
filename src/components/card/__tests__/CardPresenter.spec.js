import * as uut from '../CardPresenter';

describe('CardPresenter', () => {
  describe('extractPositionValues', () => {
    it('should work with basic string value', () => {
      expect(uut.extractPositionValues('top')).toEqual({top: true, right: false, bottom: false, left: false});
      expect(uut.extractPositionValues('bottom')).toEqual({top: false, right: false, bottom: true, left: false});
      expect(uut.extractPositionValues('left')).toEqual({top: false, right: false, bottom: false, left: true});
      expect(uut.extractPositionValues('right')).toEqual({top: false, right: true, bottom: false, left: false});
      expect(uut.extractPositionValues('')).toEqual({top: false, right: false, bottom: false, left: false});
    });

    it('should work with basic array of positions', () => {
      expect(uut.extractPositionValues(['top', 'bottom'])).toEqual({
        top: true,
        right: false,
        bottom: true,
        left: false
      });
      expect(uut.extractPositionValues(['left', 'right'])).toEqual({
        top: false,
        right: true,
        bottom: false,
        left: true
      });
      expect(uut.extractPositionValues(['top', 'left', 'bottom', 'right'])).toEqual({
        top: true,
        right: true,
        bottom: true,
        left: true
      });
      expect(uut.extractPositionValues([])).toEqual({top: false, right: false, bottom: false, left: false});
    });
  });
});
