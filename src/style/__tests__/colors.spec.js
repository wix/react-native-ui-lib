import uut from '../colors';
import LogService from '../../services/LogService';

const SYSTEM_COLORS = ['grey', 'white', 'black'];
const GetColorsByHexOptions = {validColors: SYSTEM_COLORS};

describe('style/Colors', () => {
  describe('rgba', () => {
    const logServiceSpy = jest.spyOn(LogService, 'error');

    it('should add alpha to hex color value', () => {
      expect(uut.rgba(uut.green30, 0.7)).toBe('rgba(0, 168, 126, 0.7)');
      expect(uut.rgba(uut.red10, 0.7)).toBe('rgba(213, 39, 18, 0.7)');
      expect(uut.rgba(uut.green30, 0.25)).toBe('rgba(0, 168, 126, 0.25)');
      // expect(uut.rgba('#ff2442', 0.05)).toBe(`${'#ff2442'}0D`);
      // expect(uut.rgba(uut.blue20, 1)).toBe(`${uut.blue20}FF`);
      // expect(uut.rgba(uut.blue20)).toBe(`${uut.blue20}FF`);
      // expect(uut.rgba(uut.blue20, 2)).toBe(`${uut.blue20}`);
      // expect(uut.rgba(uut.blue20, -2)).toBe(`${uut.blue20}`);
      // expect(uut.rgba(uut.blue20, '12ddsav')).toBe(`${uut.blue20}`);
    });

    it('should add alpha to rgb color value', () => {
      expect(uut.rgba(101, 200, 136, 0.7)).toBe('rgba(101, 200, 136, 0.7)');
      expect(uut.rgba(207, 38, 47, 0.7)).toBe('rgba(207, 38, 47, 0.7)');
      expect(uut.rgba(101, 200, 136, 0.25)).toBe('rgba(101, 200, 136, 0.25)');
    });

    it('should add alpha to 3 digits hex color value', () => {
      expect(uut.rgba('#333', 0.7)).toBe('rgba(51, 51, 51, 0.7)');
      expect(uut.rgba('#333', 0.1)).toBe('rgba(51, 51, 51, 0.1)');
      expect(uut.rgba('#DEF', 0.25)).toBe('rgba(221, 238, 255, 0.25)');
      expect(uut.rgba('#F24', 1)).toBe('rgba(255, 34, 68, 1)');
    });

    it('should handle wrong number of params', () => {
      expect(uut.rgba(101, 136, 0.7)).toBe(undefined);
      expect(uut.rgba(undefined, 0.2)).toBe(undefined);
      expect(logServiceSpy).toHaveBeenNthCalledWith(2, 'Colors.rgba fail due to invalid arguments');
    });

    it('should handle invalid rgb code', () => {
      expect(() => uut.rgba(-12, 128, 136, 0.7)).toThrow(new Error('-12 is invalid rgb code, please use number between 0-255'));
      expect(() => uut.rgba(12, 128, 256, 0.7)).toThrow(new Error('256 is invalid rgb code, please use number between 0-255'));
    });

    it('should handle invalid hex code', () => {
      expect(() => uut.rgba('#ff22445', 0.7)).toThrow(new Error('#ff22445 is invalid hex color'));
      expect(() => uut.rgba('ff2244', 0.7)).toThrow(new Error('ff2244 is invalid hex color'));
      expect(() => uut.rgba('#ff244', 0.7)).toThrow(new Error('#ff244 is invalid hex color'));
    });
  });

  describe('isEmpty', () => {
    it('should return true if color is undefined', () => {
      expect(uut.isEmpty(undefined)).toBe(true);
      expect(uut.isEmpty(null)).toBe(true);
    });

    it('should return true if color is transparent', () => {
      expect(uut.isEmpty('transparent')).toBe(true);
    });

    it('should return false if color is valid', () => {
      expect(uut.isEmpty('#fff')).toBe(false);
      expect(uut.isEmpty(uut.green20)).toBe(false);
    });
  });

  describe('getColorTint', () => {
    it('should return back transparent if transparent was passed', () => {
      expect(uut.getColorTint('transparent', '40')).toEqual('transparent');
    });

    it('should return color with a specific tint', () => {
      expect(uut.getColorTint(uut.green30, '40')).toEqual(uut.green40);
      expect(uut.getColorTint(uut.blue20, '60')).toEqual(uut.blue60);
      expect(uut.getColorTint(uut.blue20, 60)).toEqual(uut.blue60);
    });

    it('should return same color if tintLevel param is undefined or NaN', () => {
      expect(uut.getColorTint('#F1BE0B')).toEqual('#F1BE0B');
      expect(uut.getColorTint('#F1BE0B', '2a4')).toEqual('#F1BE0B');
    });

    it('should return undefined if color param is undefined', () => {
      expect(uut.getColorTint(undefined, 10)).toEqual(undefined);
    });

    it('should handle a color which exists in uiLib but doesn\'t have predefined tints', () => {
      expect(uut.getColorTint('#000000', 60)).toEqual('#808080');
    });

    it('should handle color that does not exist in `uilib`', () => {
      expect(uut.getColorTint('#F1BE0B', 10)).toEqual('#8D7006'); //
      expect(uut.getColorTint('#F1BE0B', 20)).toEqual('#BE9609'); //
      expect(uut.getColorTint('#F1BE0B', 30)).toEqual('#F1BE0B'); //
      expect(uut.getColorTint('#F1BE0B', 40)).toEqual('#F6CC37'); //
      expect(uut.getColorTint('#F1BE0B', 50)).toEqual('#F8D868'); //
      expect(uut.getColorTint('#F1BE0B', 60)).toEqual('#FAE599'); //
      expect(uut.getColorTint('#F1BE0B', 70)).toEqual('#FDF1C9'); //
      expect(uut.getColorTint('#F1BE0B', 80)).toEqual('#FFFEFA'); //
    });

    it('should round down tint level to the nearest one', () => {
      expect(uut.getColorTint('#F1BE0B', 75)).toEqual('#FDF1C9');
      expect(uut.getColorTint('#F1BE0B', 25)).toEqual('#BE9609');
      expect(uut.getColorTint('#F1BE0B', 35)).toEqual('#F1BE0B');
    });

    it('should handle out of range tint levels and round them to the nearest one in range', () => {
      expect(uut.getColorTint('#F1BE0B', 3)).toEqual('#8D7006');
      expect(uut.getColorTint('#F1BE0B', 95)).toEqual('#FFFEFA');
    });
  });

  describe('generateColorPalette', () => {
    const baseColor = '#3F88C5';
    const tints = ['#193852', '#255379', '#316EA1', '#3F88C5', '#66A0D1', '#8DB9DD', '#B5D1E9', '#DCE9F4'];
    const baseColorLight = '#DCE9F4';
    const tintsLight = ['#1A3851', '#265278', '#326D9F', '#4187C3', '#68A0CF', '#8EB8DC', '#B5D1E8', '#DCE9F4'];
    const saturationLevels = [-10, -10, -20, -20, -25, -25, -25, -25, -20, -10];
    const tintsSaturationLevels = [
      '#1E384D',
      '#2D5271',
      '#466C8C',
      '#3F88C5',
      '#7F9EB8',
      '#A0B7CB',
      '#C1D0DD',
      '#E2E9EE'
    ];
    // const tintsSaturationLevelsDarkest = ['#162837', '#223F58', '#385770', '#486E90', '#3F88C5', '#7C9CB6', '#9AB2C6', '#B7C9D7', '#D3DFE9', '#F0F5F9'];
    // const tintsAddDarkestTints = ['#12283B', '#1C405E', '#275881', '#3270A5', '#3F88C5', '#629ED0', '#86B4DA', '#A9CAE5', '#CCDFF0', '#EFF5FA'];

    it('should memoize calls for generateColorPalette', () => {
      uut.getColorTint(baseColor, 20);
      uut.getColorTint(baseColor, 50);
      uut.getColorTint(baseColor, 70);
      const cachedPalette = uut.generateColorPalette.cache.get(baseColor);
      expect(cachedPalette).toBeDefined();
      expect(cachedPalette.includes(baseColor)).toBe(true);
    });

    it('should generateColorPalette return 8 tints with 10 lightness increment', () => {
      const palette = uut.generateColorPalette(baseColor);
      expect(palette.length).toBe(8);
      expect(palette).toContain(baseColor);
      expect(palette).toEqual(tints);
    });

    it('should generateColorPalette with adjustLightness option false', () => {
      const palette = uut.generateColorPalette(baseColor, {adjustLightness: false});
      expect(palette.length).toBe(8);
      expect(palette).toContain(baseColor);
      expect(palette).toEqual(tints);
    });

    it('should generateColorPalette with adjustSaturation option false', () => {
      const palette = uut.generateColorPalette(baseColorLight, {adjustSaturation: false});
      expect(palette.length).toBe(8);
      expect(palette).toContain(baseColorLight);
      expect(palette).toEqual(tintsLight);
    });

    it('should generateColorPalette with adjustSaturation option true and saturationLevels 8 array', () => {
      const palette = uut.generateColorPalette(baseColor, {adjustSaturation: true, saturationLevels});
      expect(palette.length).toBe(8);
      expect(palette).toContain(baseColor); // adjusting baseColor tint as well
      expect(palette).toEqual(tintsSaturationLevels);
    });

    // it('should generateColorPalette with adjustSaturation option true and saturationLevels 10 array and addDarkestTints true', () => {
    //   const options = {adjustSaturation: true, saturationLevels, addDarkestTints: true};
    //   const palette = uut.generateColorPalette(baseColor, options);
    //   expect(palette.length).toBe(10);
    //   expect(palette).toContain(baseColor); // adjusting baseColor tint as well
    //   expect(palette).toEqual(tintsSaturationLevelsDarkest);
    // });

    it('should generateColorPalette with avoidReverseOnDark option false not reverse on light mode (default)', () => {
      const palette = uut.generateColorPalette(baseColor, {avoidReverseOnDark: false});
      expect(palette.length).toBe(8);
      expect(palette).toContain(baseColor);
      expect(palette).toEqual(tints);
    });

    it('should generateColorPalette with avoidReverseOnDark option true not reverse on light mode', () => {
      const palette = uut.generateColorPalette(baseColor, {avoidReverseOnDark: true});
      expect(palette.length).toBe(8);
      expect(palette).toContain(baseColor);
      expect(palette).toEqual(tints);
    });

    it('should generateColorPalette with addDarkestTints option false return 8 tints with 10 lightness increment (default)', () => {
      const palette = uut.generateColorPalette(baseColor, {addDarkestTints: false});
      expect(palette.length).toBe(8);
      expect(palette).toContain(baseColor);
      expect(palette).toEqual(tints);
    });

    // it('should generateColorPalette with addDarkestTints option true return 10 tints with 9 lightness increment', () => {
    //   const palette = uut.generateColorPalette(baseColor, {addDarkestTints: true});
    //   expect(palette.length).toBe(10);
    //   expect(palette).toContain(baseColor);
    //   expect(palette).toEqual(tintsAddDarkestTints);
    // });
  });

  describe('generateDesignTokens', () => {
    it('should generate design tokens from dark color for light theme', () => {
      const primaryColor = '#860D86';
      expect(uut.isDark(primaryColor)).toEqual(true);
      expect(uut.generateDesignTokens(primaryColor)).toEqual({
        $backgroundPrimaryHeavy: primaryColor,
        $backgroundPrimaryLight: '#FFFAFF',
        $backgroundPrimaryMedium: '#FACCFA',
        $iconPrimary: primaryColor,
        $iconPrimaryLight: '#F16FF1',
        $outlinePrimary: primaryColor,
        $textPrimary: primaryColor
      });
    });

    it('should generate design tokens from light color for light theme', () => {
      const primaryColor = '#E9BEE7';
      expect(uut.isDark(primaryColor)).toEqual(false);
      expect(uut.generateDesignTokens(primaryColor)).toEqual({
        $backgroundPrimaryHeavy: '#A4379F',
        $backgroundPrimaryLight: '#F6E4F5',
        $backgroundPrimaryMedium: '#E9BEE7',
        $iconPrimary: '#A4379F',
        $iconPrimaryLight: '#CF72CB',
        $outlinePrimary: '#A4379F',
        $textPrimary: '#A4379F'
      });
    });

    it('should generate design tokens from dark color for dark theme', () => {
      const primaryColor = '#860D86';
      expect(uut.isDark(primaryColor)).toEqual(true);
      expect(uut.generateDesignTokens(primaryColor, true)).toEqual({
        $backgroundPrimaryHeavy: '#F69DF6',
        $backgroundPrimaryLight: '#860D86',
        $backgroundPrimaryMedium: '#B512B5',
        $iconPrimary: '#F69DF6',
        $iconPrimaryLight: '#ED40ED',
        $outlinePrimary: '#F69DF6',
        $textPrimary: '#F69DF6'
      });
    });

    it('should generate design tokens from light color for dark theme', () => {
      const primaryColor = '#E9BEE7';
      expect(uut.isDark(primaryColor)).toEqual(false);
      expect(uut.generateDesignTokens(primaryColor, true)).toEqual({
        $backgroundPrimaryHeavy: primaryColor,
        $backgroundPrimaryLight: '#581E55',
        $backgroundPrimaryMedium: '#7E2B7A',
        $iconPrimary: primaryColor,
        $iconPrimaryLight: '#C24CBD',
        $outlinePrimary: primaryColor,
        $textPrimary: primaryColor
      });
    });
  });

  describe('isDesignToken', () => {
    it('should return true if the color passed is design token', () => {
      expect(uut.isDesignToken({semantic: ['$textDefault'], toString: () => {}})).toEqual(true);
      expect(uut.isDesignToken({resource_paths: ['@color/textNeutral'], toString: () => {}})).toEqual(true);
      expect(uut.isDesignToken({test: 'fail', toString: () => {}})).toEqual(false);
      expect(uut.isDesignToken(uut.red10)).toEqual(false);
    });
  });

  describe('getSystemColorByHex', () => {
    it('should return the system color, if the color is included in the validColors array', () => {
      expect(uut.getSystemColorByHex('#FFFFFF', GetColorsByHexOptions)).toEqual('white');
      expect(uut.getSystemColorByHex('#000000', GetColorsByHexOptions)).toEqual('black');
      expect(uut.getSystemColorByHex('#0A62EE', {validColors: [...SYSTEM_COLORS, 'blue']})).toEqual('blue30');
      expect(uut.getSystemColorByHex('#FB6413', {validColors: [...SYSTEM_COLORS, 'orange']})).toEqual('orange30');
    });

    it('should return undefined if the color is not included in validColors', () => {
      expect(uut.getSystemColorByHex('#0A62EE', GetColorsByHexOptions)).toEqual(undefined);
      expect(uut.getSystemColorByHex('#00A87E', GetColorsByHexOptions)).toEqual(undefined);
    });

    it('without validColors array the function will return the first system color name match the color', () => {
      expect(uut.getSystemColorByHex('#0A62EE')).toEqual('blue30');
      expect(uut.getSystemColorByHex('#00A87E')).toEqual('green30');
    });

    it('should return undefined for color that does not exist in our colors palette.', () => {
      uut.anotherViolet = '#5A48F5';
      expect(uut.getSystemColorByHex('#5A48F5')).toEqual('violet30');
      expect(uut.getSystemColorByHex('#5A48F5', GetColorsByHexOptions)).toEqual(undefined);
      expect(uut.getSystemColorByHex('#5A48F5', {validColors: [...SYSTEM_COLORS, 'anotherViolet']})).toEqual('anotherViolet');
    });
  });

  describe('getColor', () => {
    it('should return the right color depends on the scheme type passed', () => {
      expect(uut.getColor('$backgroundPrimaryHeavy', 'light')).toBe('#5A48F5');
      expect(uut.getColor('$backgroundPrimaryHeavy', 'dark')).toBe('#B2ABFF');
    });

    it('should return the right color based on the default scheme type', () => {
      expect(uut.getColor('$backgroundPrimaryHeavy')).toBe('#5A48F5');
    });
  });
});
