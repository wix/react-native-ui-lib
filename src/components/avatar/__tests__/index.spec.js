import {Avatar} from '../index';
import {BADGE_SIZES} from '../../badge';


describe('Avatar Badge', () => {
  describe('badgeProps.size, supports enum or number', () => {
    it('should return 99 as the size number given', () => {
      const uut = new Avatar({badgeProps: {size: 99}});
      expect(uut.getBadgeSize()).toEqual(99);
    });

    it('should return 0 as the given size number', () => {
      const uut = new Avatar({badgeProps: {size: 0}});
      expect(uut.getBadgeSize()).toEqual(0);
    });

    it('should return the first badge size mapped by given key', () => {
      const firstSizeKey = Object.keys(BADGE_SIZES)[1];
      const uut = new Avatar({badgeProps: {size: firstSizeKey}});
      expect(uut.getBadgeSize()).toEqual(BADGE_SIZES[firstSizeKey]);
    });

    it('should return the last badge size mapped by given key', () => {
      const keys = Object.keys(BADGE_SIZES);
      const lastSizeKey = keys[keys.length - 1];
      const uut = new Avatar({badgeProps: {size: lastSizeKey}});
      expect(uut.getBadgeSize()).toEqual(BADGE_SIZES[lastSizeKey]);
    });

    it('should return a default value from Badge for a non-exist size type', () => {
      const sizeKey = '!NOT_A_VALID_ENUM$';
      const uut = new Avatar({badgeProps: {size: sizeKey}});
      expect(typeof uut.getBadgeSize()).toBe('number');
    });
  });
});
