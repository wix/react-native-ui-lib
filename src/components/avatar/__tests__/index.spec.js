import {Avatar} from '../index';


describe('Avatar Badge', () => {
  describe('badgeProps.size supports number', () => {
    it('should return 99 as the size number given', () => {
      const uut = new Avatar({badgeProps: {size: 99}});
      expect(uut.getBadgeSize()).toEqual(99);
    });

    it('should return default when passing 0 as size', () => {
      const uut = new Avatar({badgeProps: {size: 0}});
      expect(uut.getBadgeSize()).toEqual(10);
    });
  });
});
