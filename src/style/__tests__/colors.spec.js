import uut from '../colors';

describe('style/Colors', () => {
  it('should add alpha to hex color value', () => {
    expect(uut.rgba(uut.green30, 0.7)).toBe('rgba(0, 205, 139, 0.7)');
    expect(uut.rgba(uut.red10, 0.7)).toBe('rgba(215, 46, 21, 0.7)');
    expect(uut.rgba(uut.green30, 0.25)).toBe('rgba(0, 205, 139, 0.25)');
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
    expect(() => uut.rgba(101, 136, 0.7)).toThrow(new Error('rgba can work with either 2 or 4 arguments'));
  });

  it('should handle invalid rgb code', () => {
    expect(() => uut.rgba(-12, 128, 136, 0.7)).toThrow(new Error('-12 is invalid rgb code, please use number between 0-255'),);
    expect(() => uut.rgba(12, 128, 256, 0.7)).toThrow(new Error('256 is invalid rgb code, please use number between 0-255'),);
  });

  it('should handle invalid hex code', () => {
    expect(() => uut.rgba('#ff22445', 0.7)).toThrow(new Error('#ff22445 is invalid hex color'));
    expect(() => uut.rgba('ff2244', 0.7)).toThrow(new Error('ff2244 is invalid hex color'));
    expect(() => uut.rgba('#ff244', 0.7)).toThrow(new Error('#ff244 is invalid hex color'));
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

    it('should handle color that does not exist in uilib', () => {
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

    it('should memoize calls for generateColorPalette', () => {
      uut.getColorTint('#3F88C5', 20);
      uut.getColorTint('#3F88C5', 50);
      uut.getColorTint('#3F88C5', 70);
      const cachedPalette = uut.generateColorPalette.cache.get('#3F88C5');
      expect(cachedPalette).toBeDefined();
      expect(cachedPalette.length).toBe(8);
      expect(cachedPalette.includes('#3F88C5')).toBe(true);
    });

    it('should generateColorPalette', () => {
      const palette = uut.generateColorPalette('#3F88C5');
      expect(palette).toEqual(['#193852', '#255379', '#316EA1', '#3F88C5', '#66A0D1', '#8DB9DD', '#B5D1E9', '#DCE9F4']);
    });

    it('should generateColorPalette with adjusted saturation', () => {
      const palette = uut.generateColorPalette('#FFE5FF');
      expect(palette).toEqual(['#661A66', '#8F248F', '#B82EB7', '#D148D1', '#DB71DB', '#E699E6', '#F0C2F0', '#FFE5FF']);
    });
  });
});
