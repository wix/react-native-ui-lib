import TextField from '..';
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
    it('should return grey10 when no color state or color was passed', () => {
      const uut = new TextField({});
      expect(uut.getStateColor(undefined)).toEqual(Colors.grey10);
    });

    it('should return the string color given as the first argument ', () => {
      const uut = new TextField({});
      expect(uut.getStateColor(Colors.blue30)).toEqual(Colors.blue30);
    });

    it('should return "default" color from the color states object passed', () => {
      const uut = new TextField({});
      expect(uut.getStateColor({default: Colors.blue30})).toEqual(Colors.blue30);
    });

    it('should return "focus" color from the color states object passed when input is focused', () => {
      const uut = new TextField({});
      uut.state = {focused: true};
      expect(uut.getStateColor({default: Colors.grey10, focus: Colors.green30})).toEqual(Colors.green30);
    });
    
    it('should return default component state colors by default', () => {
      const uut = new TextField({});
      expect(uut.getStateColor()).toEqual(Colors.grey10);
      uut.state = {focused: true};
      expect(uut.getStateColor()).toEqual(Colors.grey10);
    });
    
    it('should return default component state colors by default even when given partial color state', () => {
      const uut = new TextField({});
      expect(uut.getStateColor({focus: Colors.blue30})).toEqual(Colors.grey10);
      uut.state = {focused: true};
      expect(uut.getStateColor({default: Colors.dark20})).toEqual(Colors.grey10);
    });
    
    it('should return default "error" state when there is an error', () => {
      const uut = new TextField({error: 'error'});
      expect(uut.getStateColor()).toEqual(Colors.grey10);
    });
    
    it('should return given "error" state when there is an error', () => {
      const uut = new TextField({error: 'error'});
      expect(uut.getStateColor({default: Colors.grey10, error: Colors.red20})).toEqual(Colors.red20);
    });
    
    it('should return disabled color when disabled', () => {
      const uut = new TextField({editable: false});
      expect(uut.getStateColor()).toEqual(Colors.grey50);
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
