import TextField from '../TextField';
import {Colors} from '../../../style';

describe('TextField', () => {
  // beforeEach(() => {});

  describe('shouldFakePlaceholder', () => {
    it('should shouldFakePlaceholder', () => {
      let uut = new TextField({});
      expect(uut.shouldFakePlaceholder()).toBe(false);

      uut = new TextField({floatingPlaceholder: true});
      expect(uut.shouldFakePlaceholder()).toBe(true);

      uut = new TextField({floatingPlaceholder: true, centered: true});
      expect(uut.shouldFakePlaceholder()).toBe(false);
    });
  });

  describe('getStateColor', () => {
    it('should return dark70 when blur (inactive)', () => {
      const uut = new TextField({});
      expect(uut.getStateColor(undefined, true)).toEqual(Colors.dark70);
    });
    it('should return red30 when error', () => {
      const uut = new TextField({error: 'test error'});
      expect(uut.getStateColor(undefined, true)).toEqual(Colors.red30);
    });
    it('should return blue30 when focused', () => {
      const uut = new TextField({});
      uut.state = {focused: true};
      expect(uut.getStateColor(undefined, true)).toEqual(Colors.blue30);
    });

    const underlines = {default: Colors.cyan40, focus: Colors.orange60, error: Colors.purple50};
    it('should return cyan40 when passing underlineColor and when blur (inactive)', () => {
      const uut = new TextField({underlineColor: underlines});
      expect(uut.getStateColor(uut.props.underlineColor, true)).toEqual(Colors.cyan40);
    });
    it('should return purple50 when passing underlineColor and when error', () => {
      const uut = new TextField({underlineColor: underlines, error: 'test error'});
      expect(uut.getStateColor(uut.props.underlineColor, true)).toEqual(Colors.purple50);
    });
    it('should return orange60 when passing underlineColor and when focused', () => {
      const uut = new TextField({underlineColor: underlines});
      uut.state = {focused: true};
      expect(uut.getStateColor(uut.props.underlineColor, true)).toEqual(Colors.orange60);
    });
  });

  describe('getCharCount', () => {
    it('should return 5 when value is "inbal"', () => {
      const uut = new TextField({value: 'inbal'});
      expect(uut.getCharCount()).toBe(5);
    });
  });

  describe('isCounterLimit', () => {
    it('should return true when character count = 10 and maxLength = 10', () => {
      const uut = new TextField({maxLength: 10});
      jest.spyOn(uut, 'getCharCount').mockImplementation(() => 10);
      expect(uut.isCounterLimit()).toBe(true);
      expect(uut.getCharCount).toHaveBeenCalledTimes(1);
    });
    it('should return false when character count = 5 and maxLength = 10', () => {
      const uut = new TextField({maxLength: 10});
      jest.spyOn(uut, 'getCharCount').mockImplementation(() => 5);
      expect(uut.isCounterLimit()).toBe(false);
      expect(uut.getCharCount).toHaveBeenCalledTimes(1);
    });
  });
});
