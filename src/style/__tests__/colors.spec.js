import uut from '../colors';

describe('services/AvatarService', () => {
  it('should add alpha to hex color value', () => {
    expect(uut.rgba(uut.green30, 0.7)).toBe('rgba(101, 200, 136, 0.7)');
    expect(uut.rgba(uut.red10, 0.7)).toBe('rgba(207, 38, 47, 0.7)');
    expect(uut.rgba(uut.green30, 0.25)).toBe('rgba(101, 200, 136, 0.25)');
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

  it('should handle wrong number of params', () => {
    expect(() => uut.rgba(101, 136, 0.7)).toThrow(new Error('rgba can work with either 2 or 4 arguments'));
  });

  it('should handle invalid rgb code', () => {
    expect(() => uut.rgba(-12, 128, 136, 0.7)).toThrow(
      new Error('-12 is invalid rgb code, please use number between 0-255'),
    );
    expect(() => uut.rgba(12, 128, 256, 0.7)).toThrow(
      new Error('256 is invalid rgb code, please use number between 0-255'),
    );
  });

  it('should handle invalid hex code', () => {
    expect(() => uut.rgba('#ff22445', 0.7)).toThrow(new Error('#ff22445 is invalid hex color'));
    expect(() => uut.rgba('ff2244', 0.7)).toThrow(new Error('ff2244 is invalid hex color'));
    expect(() => uut.rgba('#ff244', 0.7)).toThrow(new Error('#ff244 is invalid hex color'));
  });

  describe('getColorTint', () => {
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
    
    it('should handle color that does not exist in uilib', () => {
      expect(uut.getColorTint('#F1BE0B', 10).toLowerCase()).toEqual('#d2a50a');
      expect(uut.getColorTint('#F1BE0B', 20).toLowerCase()).toEqual('#deaf0a');
      expect(uut.getColorTint('#F1BE0B', 30).toLowerCase()).toEqual('#f1be0b');
      expect(uut.getColorTint('#F1BE0B', 40).toLowerCase()).toEqual('#f5d04d');
      expect(uut.getColorTint('#F1BE0B', 50).toLowerCase()).toEqual('#f9e291');
      expect(uut.getColorTint('#F1BE0B', 60).toLowerCase()).toEqual('#fbedbb');
      expect(uut.getColorTint('#F1BE0B', 70).toLowerCase()).toEqual('#fdf4d6');
      expect(uut.getColorTint('#F1BE0B', 80).toLowerCase()).toEqual('#fef9e7');
    });
    
    it('should round down tint level to the nearest one', () => {
      expect(uut.getColorTint('#F1BE0B', 75).toLowerCase()).toEqual('#fdf4d6');
      expect(uut.getColorTint('#F1BE0B', 25).toLowerCase()).toEqual('#deaf0a');
      expect(uut.getColorTint('#F1BE0B', 35).toLowerCase()).toEqual('#f1be0b');
    });
    
    it('should handle out of range tint levels and round them to the nearest one in range', () => {
      expect(uut.getColorTint('#F1BE0B', 3).toLowerCase()).toEqual('#d2a50a');
      expect(uut.getColorTint('#F1BE0B', 95).toLowerCase()).toEqual('#fef9e7');
    });
  });
});
