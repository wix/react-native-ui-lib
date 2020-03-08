import {Avatar} from '../index';
import {Colors} from '../../../style';

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
});
