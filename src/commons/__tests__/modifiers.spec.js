import {Colors, Typography, BorderRadiuses} from '../../style';
import * as uut from '../modifiers';

describe('Modifiers', () => {
  describe('background modifiers', () => {
    it('should return color value according to background-?? prop that was sent', () => {
      expect(uut.extractBackgroundColorValue({'background-red30': true})).toBe(Colors.red30);
      expect(uut.extractBackgroundColorValue({'bg-red30': true})).toBe(Colors.red30);
    });

    it('should return undefined value for unfamiliar color const', () => {
      expect(uut.extractBackgroundColorValue({'background-uknown30': true})).toBe(undefined);
    });
  });

  describe('extractTypographyValue', () => {
    it('should extract typography value according to typography modifier', () => {
      expect(uut.extractTypographyValue({text40: true})).toEqual(Typography.text40);
      expect(uut.extractTypographyValue({text70: true})).toEqual(Typography.text70);
    });

    it('should return undefined if not typography modifier was sent', () => {
      expect(uut.extractTypographyValue({})).toEqual(undefined);
    });

    it('should return take the last typography modifier prop in case there is more than one', () => {
      expect(
        uut.extractTypographyValue({
          text40: true,
          text70: true,
        }),
      ).toEqual(Typography.text70);
      expect(
        uut.extractTypographyValue({
          text70: true,
          text40: true,
        }),
      ).toEqual(Typography.text40);
      expect(
        uut.extractTypographyValue({
          text40: true,
          text70: false,
        }),
      ).toEqual(Typography.text40);
    });

    it('should return value of the custom made typography', () => {
      const customTypography = {fontSize: Typography.text30.fontSize, fontWeight: '400'};
      Typography.loadTypographies({customTypography});
      expect(uut.extractTypographyValue({customTypography: true})).toEqual(customTypography);
      expect(
        uut.extractTypographyValue({
          text40: true,
          customTypography: true,
        }),
      ).toEqual(customTypography);
      expect(
        uut.extractTypographyValue({
          customTypography: true,
          text40: true,
        }),
      ).toEqual(Typography.text40);
    });
  });

  describe('extractPaddingValues - paddings modifiers', () => {
    it('should return paddings values  according to padding?-?? prop that was sent', () => {
      expect(
        uut.extractPaddingValues({
          'padding-25': true,
          'paddingL-15': true,
          'paddingT-10': true,
          'paddingR-20': true,
          'paddingB-15': true,
          'paddingH-20': true,
          'paddingV-15': true,
        }),
      ).toEqual({
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
      expect(uut.extractPaddingValues({'paddings-25': true})).toEqual({});
    });

    it('should ignore non numeric padding values', () => {
      expect(uut.extractPaddingValues({'padding-2a5': true})).toEqual({});
    });

    it('should support Spacing preset for padding', () => {
      expect(uut.extractPaddingValues({'padding-s3': true})).toEqual({padding: 9});
    });
  });

  describe('extractMarginValues - margins modifiers', () => {
    it('should return margins values according to margin?-?? prop that was sent', () => {
      expect(
        uut.extractMarginValues({
          'margin-25': true,
          'marginL-15': true,
          'marginT-10': true,
          'marginR-20': true,
          'marginB-15': true,
          'marginH-20': true,
          'marginV-15': true,
        }),
      ).toEqual({
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
      expect(uut.extractMarginValues({'margins-25': true})).toEqual({});
    });

    it('should ignore non numeric margin values', () => {
      expect(uut.extractMarginValues({'margin-2a5': true})).toEqual({});
    });

    it('should support Spacing preset for margin', () => {
      expect(uut.extractMarginValues({'marginL-s4': true})).toEqual({marginLeft: 12});
    });
  });

  describe('extractAlignmentsValues - alignments modifiers', () => {
    it('should return prop alignment for a row view', () => {
      expect(uut.extractAlignmentsValues({row: true, left: true})).toEqual({
        flexDirection: 'row',
        justifyContent: 'flex-start',
      });
      expect(uut.extractAlignmentsValues({row: true, right: true})).toEqual({
        flexDirection: 'row',
        justifyContent: 'flex-end',
      });
      expect(uut.extractAlignmentsValues({row: true, top: true})).toEqual({
        flexDirection: 'row',
        alignItems: 'flex-start',
      });
      expect(uut.extractAlignmentsValues({row: true, bottom: true})).toEqual({
        flexDirection: 'row',
        alignItems: 'flex-end',
      });
      expect(uut.extractAlignmentsValues({row: true, centerH: true})).toEqual({
        flexDirection: 'row',
        justifyContent: 'center',
      });
      expect(uut.extractAlignmentsValues({row: true, centerV: true})).toEqual({
        flexDirection: 'row',
        alignItems: 'center',
      });
      expect(uut.extractAlignmentsValues({row: true, spread: true})).toEqual({
        flexDirection: 'row',
        justifyContent: 'space-between',
      });
    });

    it('should return prop alignment for a column view (default)', () => {
      expect(uut.extractAlignmentsValues({left: true})).toEqual({alignItems: 'flex-start'});
      expect(uut.extractAlignmentsValues({right: true})).toEqual({alignItems: 'flex-end'});
      expect(uut.extractAlignmentsValues({top: true})).toEqual({
        justifyContent: 'flex-start',
      });
      expect(uut.extractAlignmentsValues({bottom: true})).toEqual({
        justifyContent: 'flex-end',
      });
      expect(uut.extractAlignmentsValues({centerH: true})).toEqual({alignItems: 'center'});
      expect(uut.extractAlignmentsValues({centerV: true})).toEqual({justifyContent: 'center'});
      expect(uut.extractAlignmentsValues({spread: true})).toEqual({
        justifyContent: 'space-between',
      });
    });

    it('should return center alignment for both axis', () => {
      expect(uut.extractAlignmentsValues({center: true})).toEqual({
        justifyContent: 'center',
        alignItems: 'center',
      });
      expect(uut.extractAlignmentsValues({row: true, center: true})).toEqual({
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      });
    });
  });

  describe('extractFlexStyle - flex modifier', () => {
    it('should return flex style according to flex-? prop', () => {
      expect(uut.extractFlexStyle({'flex-2': true})).toEqual({flex: 2});
      expect(uut.extractFlexStyle({flex: true})).toEqual({flex: 1});
      expect(uut.extractFlexStyle({'flex-0': true})).toEqual({flex: 0});
      expect(uut.extractFlexStyle({})).toEqual(undefined);
    });

    it('should handle flexG and flexS props', () => {
      expect(uut.extractFlexStyle({'flexG-2': true})).toEqual({flexGrow: 2});
      expect(uut.extractFlexStyle({flexG: true})).toEqual({flexGrow: 1});
      expect(uut.extractFlexStyle({'flexS-3': true})).toEqual({flexShrink: 3});
      expect(uut.extractFlexStyle({flexS: true})).toEqual({flexShrink: 1});
      expect(uut.extractFlexStyle({flexG: false, flexS: false})).toEqual(undefined);
    });

    it('should handle bad usage', () => {
      expect(uut.extractFlexStyle({'flexG-2s': true})).toEqual(undefined);
      expect(uut.extractFlexStyle({'flex-aaa': true})).toEqual(undefined);
      expect(uut.extractFlexStyle({'flexB-12': true})).toEqual(undefined);
      expect(uut.extractFlexStyle({'flex-': true})).toEqual({flex: 1});
    });
  });

  describe('extractBorderRadiusValue - BorderRadius modifier', () => {
    it('should return border radius value according br? modifier prop', () => {
      expect(uut.extractBorderRadiusValue({br10: true})).toEqual(BorderRadiuses.br10);
      expect(uut.extractBorderRadiusValue({br20: true})).toEqual(BorderRadiuses.br20);
    });
  });

  // describe('extractOwnProps', () => {
  //   it('should extract the component props from a props object', () => {
  //     const props = {color: 'red', topShadow: 1, bottomShadow: 2};
  //     expect(MultipleShadow.extractOwnProps(props)).toEqual({
  //       topShadow: 1,
  //       bottomShadow: 2,
  //     });
  //   });

  //   it('should omit props that were required to ignore', () => {
  //     const props = {color: 'red', topShadow: 1, bottomShadow: 2};
  //     expect(MultipleShadow.extractOwnProps(props, 'topShadow')).toEqual({
  //       bottomShadow: 2,
  //     });
  //     expect(MultipleShadow.extractOwnProps(props, ['topShadow', 'bottomShadow'])).toEqual({});
  //   });
  // });

  describe('extractModifiersProps', () => {
    it('should return all modifiers props', () => {
      expect(
        uut.extractModifierProps({
          'paddingL-20': true,
          'bg-red30': true,
          other: 'some-value',
        }),
      ).toEqual({
        'paddingL-20': true,
        'bg-red30': true,
      });

      expect(uut.extractModifierProps({
        'margin-50': true,
        'background-blue20': true,
        other: 'some-value',
      })).toEqual({
        'margin-50': true,
        'background-blue20': true,
      });

      expect(uut.extractModifierProps({left: true, 'bg-red10': false, other: 'some-value'})).toEqual({
        left: true,
        'bg-red10': false,
      });
    });
  });

  // describe('getThemeProps', () => {
  //   it('should return props values from the Theme Manager if were defined', () => {
  //     ThemeManager.setComponentTheme('BaseComponent', {someProp: 'themeValue'});
  //     const uut = new BaseComponent({});
  //     expect(uut.getThemeProps()).toEqual({someProp: 'themeValue'});
  //   });

  //   it('should return override theme values with passed props values', () => {
  //     ThemeManager.setComponentTheme('BaseComponent', {someProp: 'themeValue'});
  //     const uut = new BaseComponent({someProp: 'someValue'});
  //     expect(uut.getThemeProps()).toEqual({someProp: 'someValue'});
  //   });

  //   it('should return props values from the Theme Manager merged with values from passed props', () => {
  //     ThemeManager.setComponentTheme('BaseComponent', {someProp: 'themeValue'});
  //     const uut = new BaseComponent({anotherProps: 'anotherValue'});
  //     expect(uut.getThemeProps()).toEqual({someProp: 'themeValue', anotherProps: 'anotherValue'});
  //   });

  //   it('should support getThemeProps callback that accepts current props and can condition returned props', () => {
  //     ThemeManager.setComponentTheme('BaseComponent', props => ({someProp: props.test ? 'yes' : 'no'}));
  //     let uut = new BaseComponent({test: true});
  //     expect(uut.getThemeProps()).toEqual({someProp: 'yes', test: true});

  //     uut = new BaseComponent({test: false});
  //     expect(uut.getThemeProps()).toEqual({someProp: 'no', test: false});
  //   });
  // });

  // describe('updateModifiers', () => {
  //   it('should update state with new modifiers values if modifiers props have changed', () => {
  //     const uut = new BaseComponent({});
  //     jest.spyOn(uut, 'setState');

  //     uut.updateModifiers({someProp: true, 'bg-dark20': true}, {someProp: true, 'bg-dark30': true});
  //     expect(uut.setState).toHaveBeenCalledWith({backgroundColor: Colors.dark30});

  //     uut.updateModifiers({someProp: 'text'}, {'bg-red50': true, 'padding-20': true});
  //     expect(uut.setState).toHaveBeenCalledWith({backgroundColor: Colors.red50, paddings: {padding: 20}});
  //   });

  //   it('should not update state if modifiers prop have not changed', () => {
  //     const uut = new BaseComponent({});
  //     jest.spyOn(uut, 'setState');

  //     uut.updateModifiers({someProp: true, 'bg-dark20': true}, {someProp: false, 'bg-dark20': true});
  //     expect(uut.setState).not.toHaveBeenCalled();
  //   });

  //   it('should not update state if any prop value has changed', () => {
  //     const uut = new BaseComponent({});
  //     jest.spyOn(uut, 'setState');

  //     uut.updateModifiers({someProp: true, 'bg-dark20': true}, {someProp: true, 'bg-dark20': true});
  //     expect(uut.setState).not.toHaveBeenCalled();
  //   });
  // });
});
