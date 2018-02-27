import TextInput from '../TextInput';
import {Constants} from '../../../helpers';
import {Typography, Colors} from '../../../style';


describe('TextInput', () => {
  // beforeEach(() => {});

  describe('shouldFakePlaceholder', () => {
    it('should shouldFakePlaceholder', () => {
      let uut = new TextInput({});
      expect(uut.shouldFakePlaceholder()).toBe(false);

      uut = new TextInput({floatingPlaceholder: true});
      expect(uut.shouldFakePlaceholder()).toBe(true);

      uut = new TextInput({floatingPlaceholder: true, centered: true});
      expect(uut.shouldFakePlaceholder()).toBe(false);
    });
  });

  describe('getUnderlineStyle', () => {
    it('should return dark70 when blur (inactive)', () => {
      const uut = new TextInput({});
      expect(uut.getUnderlineStyle()).toEqual({borderColor: Colors.dark70});
    });
    it('should return red30 when error', () => {
      const uut = new TextInput({error: 'test error'});
      expect(uut.getUnderlineStyle()).toEqual({borderColor: Colors.red30});
    });
    it('should return blue30 when focused', () => {
      const uut = new TextInput({});
      uut.state = {focused: true};
      expect(uut.getUnderlineStyle()).toEqual({borderColor: Colors.blue30});
    });

    const underlines = {default: Colors.cyan40, focus: Colors.orange60, error: Colors.purple50};
    it('should return cyan40 when passing underlineColor and when blur (inactive)', () => {
      const uut = new TextInput({underlineColor: underlines});
      expect(uut.getUnderlineStyle()).toEqual({borderColor: Colors.cyan40});
    });
    it('should return purple50 when passing underlineColor and when error', () => {
      const uut = new TextInput({underlineColor: underlines, error: 'test error'});
      expect(uut.getUnderlineStyle()).toEqual({borderColor: Colors.purple50});
    });
    it('should return orange60 when passing underlineColor and when focused', () => {
      const uut = new TextInput({underlineColor: underlines});
      uut.state = {focused: true};
      expect(uut.getUnderlineStyle()).toEqual({borderColor: Colors.orange60});
    });
  });

  describe('getHeight', () => {
    it('when not multiline, should setState not be called', () => {
      const uut = new TextInput({});
      jest.spyOn(uut, 'setState').mockImplementation(() => {});
      uut.getHeight();
      expect(uut.setState).not.toHaveBeenCalled();
    });

    it('should iOS, when only multiline, setState height with undefined', () => {
      const uut = new TextInput({multiline: true});
      jest.spyOn(uut, 'setState').mockImplementation(() => {});
      uut.getHeight();
      expect(uut.setState.height).toBeUndefined();
    });

    it('should iOS, when multiline and numberOfLines, setState height with typography * numberOfLines', () => {
      const uut = new TextInput({multiline: true, numberOfLines: 2});
      jest.spyOn(uut, 'setState').mockImplementation(() => {});
      jest.spyOn(uut, 'getTypography');
      uut.getTypography.mockReturnValue(Typography.text70);
      const lineHeight = Typography.text70.lineHeight;
      const {numberOfLines} = uut.props;
      const boxHeight = lineHeight * numberOfLines;
      uut.getHeight();
      expect(uut.setState).toHaveBeenCalledWith({height: boxHeight});
    });

    it('should Android, when multiline and numberOfLines, setState not be called', () => {
      mockAndroid();
      const uut = new TextInput({multiline: true, numberOfLines: 2});
      jest.spyOn(uut, 'setState').mockImplementation(() => {});
      uut.getHeight();
      expect(uut.setState).not.toHaveBeenCalled();
    });
  });

  describe('getCharCount', () => {
    it('should return 5 when value is "inbal"', () => {
      const uut = new TextInput({value: 'inbal'});
      expect(uut.getCharCount()).toBe(5);
    });
  });

  describe('isCounterLimit', () => {
    it('should return true when character count = 10 and maxLength = 10', () => {
      const uut = new TextInput({maxLength: 10});
      jest.spyOn(uut, 'getCharCount').mockImplementation(() => 10);
      expect(uut.isCounterLimit()).toBe(true);
      expect(uut.getCharCount).toHaveBeenCalledTimes(1);
    });
    it('should return false when character count = 5 and maxLength = 10', () => {
      const uut = new TextInput({maxLength: 10});
      jest.spyOn(uut, 'getCharCount').mockImplementation(() => 5);
      expect(uut.isCounterLimit()).toBe(false);
      expect(uut.getCharCount).toHaveBeenCalledTimes(1);
    });
  });
});

function mockAndroid() {
  Constants.isIOS = false;
  Constants.isAndroid = true;
}
