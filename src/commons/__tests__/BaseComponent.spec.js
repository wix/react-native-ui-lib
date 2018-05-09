// import React from 'react';
// import {shallow} from 'enzyme';
import BaseComponent from '../BaseComponent';
import MultipleShadow from '../../components/MultipleShadow';
import View from '../../components/view';
import {Colors, Typography, BorderRadiuses, ThemeManager} from '../../style';

describe('BaseComponent', () => {
  describe('background modifiers', () => {
    it('should return color value according to background-?? prop that was sent', () => {
      let uut = new BaseComponent({'background-red30': true});
      expect(uut.extractBackgroundColorValue()).toBe(Colors.red30);
      uut = new BaseComponent({'bg-red30': true});
      expect(uut.extractBackgroundColorValue()).toBe(Colors.red30);
    });

    it('should return undefined value for unfamiliar color const', () => {
      const uut = new BaseComponent({'background-uknown30': true});
      expect(uut.extractBackgroundColorValue()).toBe(undefined);
    });
  });

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

  describe('paddings modifiers', () => {
    it('should return paddings values  according to padding?-?? prop that was sent', () => {
      const uut = new BaseComponent({
        'padding-25': true,
        'paddingL-15': true,
        'paddingT-10': true,
        'paddingR-20': true,
        'paddingB-15': true,
        'paddingH-20': true,
        'paddingV-15': true,
      });
      expect(uut.extractPaddingValues()).toEqual({
        padding: 25,
        paddingLeft: 15,
        paddingTop: 10,
        paddingRight: 20,
        paddingBottom: 15,
        paddingHorizontal: 20,
        paddingVertical: 15,
      });
    });

    it('should ignore unfamiliar paddings keys', () => {
      const uut = new BaseComponent({'paddings-25': true});
      expect(uut.extractPaddingValues()).toEqual({});
    });

    it('should ignore non numeric padding values', () => {
      const uut = new BaseComponent({'padding-2a5': true});
      expect(uut.extractPaddingValues()).toEqual({});
    });

    it('should support Spacing preset for padding', () => {
      const uut = new BaseComponent({'padding-s3': true});
      expect(uut.extractPaddingValues()).toEqual({padding: 9});
    });
  });

  describe('margins modifiers', () => {
    it('should return margins values according to margin?-?? prop that was sent', () => {
      const uut = new BaseComponent({
        'margin-25': true,
        'marginL-15': true,
        'marginT-10': true,
        'marginR-20': true,
        'marginB-15': true,
        'marginH-20': true,
        'marginV-15': true,
      });
      expect(uut.extractMarginValues()).toEqual({
        margin: 25,
        marginLeft: 15,
        marginTop: 10,
        marginRight: 20,
        marginBottom: 15,
        marginHorizontal: 20,
        marginVertical: 15,
      });
    });

    it('should ignore unfamiliar margin keys', () => {
      const uut = new BaseComponent({'margins-25': true});
      expect(uut.extractMarginValues()).toEqual({});
    });

    it('should ignore non numeric margin values', () => {
      const uut = new BaseComponent({'margin-2a5': true});
      expect(uut.extractMarginValues()).toEqual({});
    });

    it('should support Spacing preset for margin', () => {
      const uut = new BaseComponent({'marginL-s4': true});
      expect(uut.extractMarginValues()).toEqual({marginLeft: 12});
    });
  });

  describe('alignments modifiers', () => {
    it('should return prop alignment for a row view', () => {
      let uut = new BaseComponent({row: true, left: true});
      expect(uut.extractAlignmentsValues()).toEqual({
        flexDirection: 'row',
        justifyContent: 'flex-start',
      });
      uut = new BaseComponent({row: true, right: true});
      expect(uut.extractAlignmentsValues()).toEqual({
        flexDirection: 'row',
        justifyContent: 'flex-end',
      });
      uut = new BaseComponent({row: true, top: true});
      expect(uut.extractAlignmentsValues()).toEqual({
        flexDirection: 'row',
        alignItems: 'flex-start',
      });
      uut = new BaseComponent({row: true, bottom: true});
      expect(uut.extractAlignmentsValues()).toEqual({
        flexDirection: 'row',
        alignItems: 'flex-end',
      });
      uut = new BaseComponent({row: true, centerH: true});
      expect(uut.extractAlignmentsValues()).toEqual({
        flexDirection: 'row',
        justifyContent: 'center',
      });
      uut = new BaseComponent({row: true, centerV: true});
      expect(uut.extractAlignmentsValues()).toEqual({
        flexDirection: 'row',
        alignItems: 'center',
      });
      uut = new BaseComponent({row: true, spread: true});
      expect(uut.extractAlignmentsValues()).toEqual({
        flexDirection: 'row',
        justifyContent: 'space-between',
      });
    });

    it('should return prop alignment for a column view (default)', () => {
      let uut = new BaseComponent({left: true});
      expect(uut.extractAlignmentsValues()).toEqual({alignItems: 'flex-start'});
      uut = new BaseComponent({right: true});
      expect(uut.extractAlignmentsValues()).toEqual({alignItems: 'flex-end'});
      uut = new BaseComponent({top: true});
      expect(uut.extractAlignmentsValues()).toEqual({
        justifyContent: 'flex-start',
      });
      uut = new BaseComponent({bottom: true});
      expect(uut.extractAlignmentsValues()).toEqual({
        justifyContent: 'flex-end',
      });
      uut = new BaseComponent({centerH: true});
      expect(uut.extractAlignmentsValues()).toEqual({alignItems: 'center'});
      uut = new BaseComponent({centerV: true});
      expect(uut.extractAlignmentsValues()).toEqual({justifyContent: 'center'});
      uut = new BaseComponent({spread: true});
      expect(uut.extractAlignmentsValues()).toEqual({
        justifyContent: 'space-between',
      });
    });

    it('should return center alignment for both axis', () => {
      let uut = new BaseComponent({center: true});
      expect(uut.extractAlignmentsValues()).toEqual({
        justifyContent: 'center',
        alignItems: 'center',
      });
      uut = new BaseComponent({row: true, center: true});
      expect(uut.extractAlignmentsValues()).toEqual({
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      });
    });
  });

  describe('flex modifiers', () => {
    it('should return flex value according to flex-? prop', () => {
      let uut = new BaseComponent({'flex-2': true});
      expect(uut.extractFlexValue()).toEqual(2);
      uut = new BaseComponent({'flex-0': true});
      expect(uut.extractFlexValue()).toEqual(0);
      uut = new BaseComponent({});
      expect(uut.extractFlexValue()).toEqual(undefined);
    });

    it('should return 1 flex value according when only flex sent', () => {
      let uut = new BaseComponent({flex: true});
      expect(uut.extractFlexValue()).toEqual(1);
      uut = new BaseComponent({'flex-': true});
      expect(uut.extractFlexValue()).toEqual(1);
    });

    it('should return undefined when prop sent with false value', () => {
      const uut = new BaseComponent({flex: false});
      expect(uut.extractFlexValue()).toEqual(undefined);
    });

    it('should ignore non numeric values', () => {
      const uut = new BaseComponent({'flex-1a2': true});
      expect(uut.extractFlexValue()).toEqual(undefined);
    });
  });

  describe('flexStyle modifier', () => {
    it('should return flex style according to flex-? prop', () => {
      let uut = new BaseComponent({'flex-2': true});
      expect(uut.extractFlexStyle()).toEqual({flex: 2});
      uut = new BaseComponent({flex: true});
      expect(uut.extractFlexStyle()).toEqual({flex: 1});
      uut = new BaseComponent({'flex-0': true});
      expect(uut.extractFlexStyle()).toEqual({flex: 0});
      uut = new BaseComponent({});
      expect(uut.extractFlexStyle()).toEqual(undefined);
    });

    it('should handle flexG and flexS props', () => {
      let uut = new BaseComponent({'flexG-2': true});
      expect(uut.extractFlexStyle()).toEqual({flexGrow: 2});
      uut = new BaseComponent({flexG: true});
      expect(uut.extractFlexStyle()).toEqual({flexGrow: 1});
      uut = new BaseComponent({'flexS-3': true});
      expect(uut.extractFlexStyle()).toEqual({flexShrink: 3});
      uut = new BaseComponent({flexS: true});
      expect(uut.extractFlexStyle()).toEqual({flexShrink: 1});
      uut = new BaseComponent({flexG: false, flexS: false});
      expect(uut.extractFlexStyle()).toEqual(undefined);
    });

    it('should handle bad usage', () => {
      let uut = new BaseComponent({'flexG-2s': true});
      expect(uut.extractFlexStyle()).toEqual(undefined);
      uut = new BaseComponent({'flex-aaa': true});
      expect(uut.extractFlexStyle()).toEqual(undefined);
      uut = new BaseComponent({'flexB-12': true});
      expect(uut.extractFlexStyle()).toEqual(undefined);
      uut = new BaseComponent({'flex-': true});
      expect(uut.extractFlexStyle()).toEqual({flex: 1});
    });
  });

  describe('border radius modifier', () => {
    it('should return border radius value according br? modifier prop', () => {
      let uut = new BaseComponent({br10: true});
      expect(uut.extractBorderRadiusValue()).toEqual(BorderRadiuses.br10);
      uut = new BaseComponent({br20: true});
      expect(uut.extractBorderRadiusValue()).toEqual(BorderRadiuses.br20);
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
});
