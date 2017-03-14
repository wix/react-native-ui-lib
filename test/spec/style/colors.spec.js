import uut from '../../../src/style/colors';

describe('services/AvatarService', () => {
  it('should add alpha to hex color value', () => {
    expect(uut.alpha(uut.green30, 0.7)).toBe(`${uut.green30}B3`);
    expect(uut.alpha(uut.red10, 0.7)).toBe(`${uut.red10}B3`);
    expect(uut.alpha(uut.green30, 0.25)).toBe(`${uut.green30}40`);
    expect(uut.alpha('#ff2442', 0.05)).toBe(`${'#ff2442'}0D`);
    expect(uut.alpha(uut.blue20, 1)).toBe(`${uut.blue20}FF`);
    expect(uut.alpha(uut.blue20)).toBe(`${uut.blue20}FF`);
    expect(uut.alpha(uut.blue20, 2)).toBe(`${uut.blue20}`);
    expect(uut.alpha(uut.blue20, -2)).toBe(`${uut.blue20}`);
    expect(uut.alpha(uut.blue20, '12ddsav')).toBe(`${uut.blue20}`);
  });
});
