import _ from 'lodash';
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
      const uut = new TextInput({autoFocus: true});
      uut.state = {focused: true};
      expect(uut.getUnderlineStyle()).toEqual({borderColor: Colors.blue30});
    });

    const underlines = {default: Colors.cyan40, focus: Colors.orange60, error: Colors.purple50};
    it('should return cyan40 when blur (inactive)', () => {
      const uut = new TextInput({underlineColor: underlines});
      expect(uut.getUnderlineStyle()).toEqual({borderColor: Colors.cyan40});
    });
    it('should return purple50 when error', () => {
      const uut = new TextInput({underlineColor: underlines, error: 'test error'});
      expect(uut.getUnderlineStyle()).toEqual({borderColor: Colors.purple50});
    });
    it('should return orange60 when focused', () => {
      const uut = new TextInput({underlineColor: underlines});
      uut.state = {focused: true};
      expect(uut.getUnderlineStyle()).toEqual({borderColor: Colors.orange60});
    });
  });

  describe('calcMultilineInputHeight', () => {
    it('should setState height with undefined', () => {
      const uut = new TextInput({});
      jest.spyOn(uut, 'setState').mockImplementation(() => {});
      uut.calcMultilineInputHeight();
      expect(uut.setState.height).toBeUndefined();
    });

    it('should iOS, when only multiline, setState height with undefined', () => {
      const uut = new TextInput({multiline: true});
      jest.spyOn(uut, 'setState').mockImplementation(() => {});
      uut.calcMultilineInputHeight();
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
      uut.calcMultilineInputHeight();
      expect(uut.setState).toHaveBeenCalledWith({height: boxHeight});
    });

    it('should Android setState height with native event height', () => {
      mockAndroid();
      const event = {};
      _.set(event, 'nativeEvent.contentSize.height', 77);
      const uut = new TextInput({});
      jest.spyOn(uut, 'setState').mockImplementation(() => {});
      uut.calcMultilineInputHeight(event);
      expect(uut.setState).toHaveBeenCalledWith({height: 77});
    });
  });
});

function mockAndroid() {
  Constants.isIOS = false;
  Constants.isAndroid = true;
}
