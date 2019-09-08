import baseComponent from '../baseComponent';
import {Colors, Typography} from '../../style';

const BaseComponent = baseComponent(false);

describe('BaseComponent', () => {
  describe('extractTypographyValue', () => {
    it('should extract typography value according to typography modifier', () => {
      expect(new BaseComponent({text40: true}).extractTypographyValue()).toEqual(Typography.text40);
      expect(new BaseComponent({text70: true}).extractTypographyValue()).toEqual(Typography.text70);
    });

    it('should return undefined if not typography modifier was sent', () => {
      expect(new BaseComponent({}).extractTypographyValue()).toEqual(undefined);
    });

    it('should return take the last typography modifier prop in case there is more than one', () => {
      expect(new BaseComponent({
        text40: true,
        text70: true
      }).extractTypographyValue(),).toEqual(Typography.text70);
      expect(new BaseComponent({
        text70: true,
        text40: true
      }).extractTypographyValue(),).toEqual(Typography.text40);
      expect(new BaseComponent({
        text40: true,
        text70: false
      }).extractTypographyValue(),).toEqual(Typography.text40);
    });

    it('should return value of the custom made typography', () => {
      const customTypography = {fontSize: Typography.text30.fontSize, fontWeight: '400'};
      Typography.loadTypographies({customTypography});
      expect(new BaseComponent({customTypography: true}).extractTypographyValue()).toEqual(customTypography);
      expect(new BaseComponent({
        text40: true,
        customTypography: true
      }).extractTypographyValue(),).toEqual(customTypography);
      expect(new BaseComponent({
        customTypography: true,
        text40: true
      }).extractTypographyValue(),).toEqual(Typography.text40);
    });
  });

  describe('updateModifiers', () => {
    it('should update state with new modifiers values if modifiers props have changed', () => {
      const uut = new BaseComponent({});
      jest.spyOn(uut, 'setState');

      uut.updateModifiers({someProp: true, 'bg-dark20': true}, {someProp: true, 'bg-dark30': true});
      expect(uut.setState).toHaveBeenCalledWith({backgroundColor: Colors.dark30});

      uut.updateModifiers({someProp: 'text'}, {'bg-red50': true, 'padding-20': true});
      expect(uut.setState).toHaveBeenCalledWith({backgroundColor: Colors.red50, paddings: {padding: 20}});
    });

    it('should not update state if modifiers prop have not changed', () => {
      const uut = new BaseComponent({});
      jest.spyOn(uut, 'setState');

      uut.updateModifiers({someProp: true, 'bg-dark20': true}, {someProp: false, 'bg-dark20': true});
      expect(uut.setState).not.toHaveBeenCalled();
    });

    it('should not update state if any prop value has changed', () => {
      const uut = new BaseComponent({});
      jest.spyOn(uut, 'setState');

      uut.updateModifiers({someProp: true, 'bg-dark20': true}, {someProp: true, 'bg-dark20': true});
      expect(uut.setState).not.toHaveBeenCalled();
    });
  });
});
