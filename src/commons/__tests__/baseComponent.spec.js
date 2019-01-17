// import React from 'react';
// import {shallow} from 'enzyme';
import baseComponent from '../baseComponent';
import MultipleShadow from '../../components/MultipleShadow';
import View from '../../components/view';
import {Colors, Typography, ThemeManager} from '../../style';

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
      expect(
        new BaseComponent({
          text40: true,
          text70: true,
        }).extractTypographyValue(),
      ).toEqual(Typography.text70);
      expect(
        new BaseComponent({
          text70: true,
          text40: true,
        }).extractTypographyValue(),
      ).toEqual(Typography.text40);
      expect(
        new BaseComponent({
          text40: true,
          text70: false,
        }).extractTypographyValue(),
      ).toEqual(Typography.text40);
    });

    it('should return value of the custom made typography', () => {
      const customTypography = {fontSize: Typography.text30.fontSize, fontWeight: '400'};
      Typography.loadTypographies({customTypography});
      expect(new BaseComponent({customTypography: true}).extractTypographyValue()).toEqual(customTypography);
      expect(
        new BaseComponent({
          text40: true,
          customTypography: true,
        }).extractTypographyValue(),
      ).toEqual(customTypography);
      expect(
        new BaseComponent({
          customTypography: true,
          text40: true,
        }).extractTypographyValue(),
      ).toEqual(Typography.text40);
    });
  });

  describe('extractOwnProps', () => {
    it('should extract the component props from a props object', () => {
      const props = {color: 'red', topShadow: 1, bottomShadow: 2};
      expect(MultipleShadow.extractOwnProps(props)).toEqual({
        topShadow: 1,
        bottomShadow: 2,
      });
    });

    it('should omit props that were required to ignore', () => {
      const props = {color: 'red', topShadow: 1, bottomShadow: 2};
      expect(MultipleShadow.extractOwnProps(props, 'topShadow')).toEqual({
        bottomShadow: 2,
      });
      expect(MultipleShadow.extractOwnProps(props, ['topShadow', 'bottomShadow'])).toEqual({});
    });
  });

  describe('extractModifiersProps', () => {
    it('should return all modifiers props', () => {
      let uut = new View({
        'paddingL-20': true,
        'bg-red30': true,
        other: 'some-value',
      });
      expect(uut.extractModifierProps()).toEqual({
        'paddingL-20': true,
        'bg-red30': true,
      });

      uut = new View({
        'margin-50': true,
        'background-blue20': true,
        other: 'some-value',
      });
      expect(uut.extractModifierProps()).toEqual({
        'margin-50': true,
        'background-blue20': true,
      });

      uut = new View({left: true, 'bg-red10': false, other: 'some-value'});
      expect(uut.extractModifierProps()).toEqual({
        left: true,
        'bg-red10': false,
      });
    });
  });

  describe('getThemeProps', () => {
    it('should return props values from the Theme Manager if were defined', () => {
      ThemeManager.setComponentTheme('BaseComponent', {someProp: 'themeValue'});
      const uut = new BaseComponent({});
      expect(uut.getThemeProps()).toEqual({someProp: 'themeValue'});
    });

    it('should return override theme values with passed props values', () => {
      ThemeManager.setComponentTheme('BaseComponent', {someProp: 'themeValue'});
      const uut = new BaseComponent({someProp: 'someValue'});
      expect(uut.getThemeProps()).toEqual({someProp: 'someValue'});
    });

    it('should return props values from the Theme Manager merged with values from passed props', () => {
      ThemeManager.setComponentTheme('BaseComponent', {someProp: 'themeValue'});
      const uut = new BaseComponent({anotherProps: 'anotherValue'});
      expect(uut.getThemeProps()).toEqual({someProp: 'themeValue', anotherProps: 'anotherValue'});
    });

    it('should support getThemeProps callback that accepts current props and can condition returned props', () => {
      ThemeManager.setComponentTheme('BaseComponent', props => ({someProp: props.test ? 'yes' : 'no'}));
      let uut = new BaseComponent({test: true});
      expect(uut.getThemeProps()).toEqual({someProp: 'yes', test: true});

      uut = new BaseComponent({test: false});
      expect(uut.getThemeProps()).toEqual({someProp: 'no', test: false});
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
