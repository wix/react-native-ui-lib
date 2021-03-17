import {Avatar} from '../index';


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
  });
});
