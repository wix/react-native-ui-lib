import {Avatar} from '../index';
import {Colors} from '../../../style';
import {BADGE_SIZES} from '../../badge';

describe('Avatar Badge', () => {
  describe('getStatusBadgeColor', () => {
    it('should return yellow when passed AWAY', () => {
      const uut = new Avatar({status: Avatar.modes.AWAY});
      expect(uut.getStatusBadgeColor(uut.props.status)).toEqual(Colors.yellow30);
    });
    it('should return yellow when passed ONLINE', () => {
      const uut = new Avatar({status: Avatar.modes.ONLINE});
      expect(uut.getStatusBadgeColor(uut.props.status)).toEqual(Colors.green30);
    });
    it('should return yellow when passed OFFLINE', () => {
      const uut = new Avatar({status: Avatar.modes.OFFLINE});
      expect(uut.getStatusBadgeColor(uut.props.status)).toEqual(Colors.dark60);
    });
  });

  describe('getBadgeColor', () => {
    it('should return undefined when either isOnline nor status is passed', () => {
      const uut = new Avatar({});
      expect(uut.getBadgeColor(uut.props.isOnline, uut.props.status)).toEqual(undefined);
    });
    it('should return undefined when isOnline is false and status not passed', () => {
      const uut = new Avatar({isOnline: false});
      expect(uut.getBadgeColor(uut.props.isOnline, uut.props.status)).toEqual(undefined);
    });
    it('should return undefined when isOnline not passed and status is NONE', () => {
      const uut = new Avatar({status: Avatar.modes.NONE});
      expect(uut.getBadgeColor(uut.props.isOnline, uut.props.status)).toEqual(undefined);
    });
    it('should return green when isOnline is true and status is NONE', () => {
      const uut = new Avatar({isOnline: true, status: Avatar.modes.NONE});
      expect(uut.getBadgeColor(uut.props.isOnline, uut.props.status)).toEqual(Colors.green30);
    });
    it('should return yellow when isOnline is true and status is AWAY (status to override isOnline)', () => {
      const uut = new Avatar({isOnline: true, status: Avatar.modes.AWAY});
      expect(uut.getBadgeColor(uut.props.isOnline, uut.props.status)).toEqual(Colors.yellow30);
    });
  });

  describe('renderBadge', () => {
    it('should return undefined when isOnline is undefined and status is NONE', () => {
      const uut = new Avatar({isOnline: false, status: Avatar.modes.NONE});
      expect(uut.renderBadge()).toEqual(undefined);
    });
    it('should return undefined when isOnline is false and status is not passed', () => {
      const uut = new Avatar({isOnline: false});
      expect(uut.renderBadge()).toEqual(undefined);
    });
    it('should return undefined when isOnline not passed and status is NONE', () => {
      const uut = new Avatar({status: Avatar.modes.NONE});
      expect(uut.renderBadge()).toEqual(undefined);
    });
    it('should return undefined when either isOnline nor status is passed', () => {
      const uut = new Avatar({});
      expect(uut.renderBadge()).toEqual(undefined);
    });
  });

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
