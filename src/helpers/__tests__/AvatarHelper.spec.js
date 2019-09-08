import Colors from '../../../src/style/colors';

describe('services/AvatarService', () => {
  let uut;
  beforeEach(() => {
    uut = require('../../../src/helpers/AvatarHelper');
  });

  it('should getAvatarColors', () => {
    const avatarColors = uut.getAvatarColors();
    expect(avatarColors).toEqual([
      Colors.blue20,
      Colors.cyan20,
      Colors.green20,
      Colors.yellow20,
      Colors.orange20,
      Colors.red20,
      Colors.purple20,
      Colors.violet20
    ]);
  });

  it('should getColorById', () => {
    const avatarColors = uut.getAvatarColors();
    expect(uut.getColorById(null)).toBe(avatarColors[0]);
    expect(uut.getColorById('a19c0ee3-c165-434e-bf4d-a6c218c83f48')).toBe(avatarColors[0]);
    expect(uut.getColorById('a19c0ee3-c165-434e-bf4d-a6c218c83f47')).toBe(avatarColors[1]);
    expect(uut.getColorById('a19c0ee3-c165-434e-bf4d-a6c218c83f46')).toBe(avatarColors[2]);
    expect(uut.getColorById('a19c0ee3-c165-434e-bf4d-a6c218c83f45')).toBe(avatarColors[3]);
    expect(uut.getColorById('a19c0ee3-c165-434e-bf4d-a6c218c83f44')).toBe(avatarColors[4]);
    expect(uut.getColorById('a19c0ee3-c165-434e-bf4d-a6c218c83f43')).toBe(avatarColors[5]);
    expect(uut.getColorById('a19c0ee3-c165-434e-bf4d-a6c218c83f42')).toBe(avatarColors[6]);
    expect(uut.getColorById('a19c0ee3-c165-434e-bf4d-a6c218c83f49')).toBe(avatarColors[7]);
  });

  it('should getColorById with custom array of colors', () => {
    const customColors = [Colors.blue10, Colors.red10, Colors.orange10];
    expect(uut.getColorById(null, customColors)).toBe(customColors[0]);
    expect(uut.getColorById('a19c0ee3-c165-434e-bf4d-a6c218c83f48', customColors)).toBe(customColors[1]);
    expect(uut.getColorById('a19c0ee3-c165-434e-bf4d-a6c218c83f47', customColors)).toBe(customColors[2]);
    expect(uut.getColorById('a19c0ee3-c165-434e-bf4d-a6c218c83f46', customColors)).toBe(customColors[0]);
    expect(uut.getColorById('a19c0ee3-c165-434e-bf4d-a6c218c83f45', customColors)).toBe(customColors[1]);
  });

  it('should getInitials', () => {
    expect(uut.getInitials('Austin Guerrero')).toBe('AG');
    expect(uut.getInitials('Austin   Guerrero')).toBe('AG');
    expect(uut.getInitials('theresa simpson')).toBe('TS');
    expect(uut.getInitials('Sarah Michelle Galler')).toBe('SM');
    expect(uut.getInitials('Keith')).toBe('K');
    expect(uut.getInitials()).toBe('');
    expect(uut.getInitials(' Austin ')).toBe('A');
  });

  describe('Is-gravatar query function', () => {
    it('should return true for a valid (known) gravatar url', () => {
      expect(uut.isGravatarUrl('https://www.gravatar.com/avatar/00000000000000000000000000000000')).toEqual(true);
      expect(uut.isGravatarUrl('http://www.gravatar.com/avatar/00000000000000000000000000000000')).toEqual(true);
      expect(uut.isGravatarUrl('http://gravatar.com/avatar/00000000000000000000000000000000')).toEqual(true);
    });

    it('should return true for a gravatar-ish url', () => {
      expect(uut.isGravatarUrl('http://gravatar.org/avatar/00000000000000000000000000000000')).toEqual(true);
      expect(uut.isGravatarUrl('http://gravatar/avatar/00000000000000000000000000000000')).toEqual(true);
    });

    it('should return false for a url with a broken path', () => {
      expect(uut.isGravatarUrl('https://www.gravatar.com')).toEqual(false);
    });

    it('should return false for a non-gravatar url', () => {
      expect(uut.isGravatarUrl('https://www._gravatar.com/avatar/00000000000000000000000000000000')).toEqual(false);
      expect(uut.isGravatarUrl('https://www.avatar.com/avatar/00000000000000000000000000000000')).toEqual(false);
      expect(uut.isGravatarUrl('https://www.gravatars.com/avatar/00000000000000000000000000000000')).toEqual(false);
      expect(uut.isGravatarUrl('https://www.grava.tar/avatar/00000000000000000000000000000000')).toEqual(false);
    });
  });

  describe('isBlankGravatarUrl', () => {
    it('should return false if the url does not contain the blank param', () => {
      expect(uut.isBlankGravatarUrl('https://www.gravatar.com/avatar/00000000000000000000000000000000')).toEqual(false);
    });

    it('should return true if the url contains the blank param', () => {
      expect(uut.isBlankGravatarUrl('https://www.gravatar.com/avatar/00000000000000000000000000000000?d=blank'),).toEqual(true);
    });

    it('should return false if it is not a gravatar url', () => {
      expect(uut.isBlankGravatarUrl('https://some/random/url/avatar/000000000?d=blank')).toEqual(false);
    });
  });

  describe('Patch-fix function', () => {
    const gravatarUrl = 'https://www.gravatar.com/avatar/00000000000000000000000000000000';
    const shortGravatarUrl = 'https://gravatar.com/avatar/00000000000000000000000000000000';

    it('should be applied for valid gravatar links without a default url-param', () => {
      expect(uut.patchGravatarUrl(gravatarUrl)).toEqual(`${gravatarUrl}?d=404`);
      expect(uut.patchGravatarUrl(shortGravatarUrl)).toEqual(`${shortGravatarUrl}?d=404`);
    });

    it('should be applied for valid gravatar links with an existing default url-param', () => {
      const url = `${gravatarUrl}?d=mock`;
      const urlShort = `${shortGravatarUrl}?d=mock`;
      expect(uut.patchGravatarUrl(url)).toEqual(`${gravatarUrl}?d=404`);
      expect(uut.patchGravatarUrl(urlShort)).toEqual(`${shortGravatarUrl}?d=404`);
    });

    it('should be applied for valid gravatar links with an existing default url-param and a hash', () => {
      const url = `${gravatarUrl}?d=mock#hash-mock`;
      const urlShort = `${shortGravatarUrl}?d=mock#hash-mock`;
      expect(uut.patchGravatarUrl(url)).toEqual(`${gravatarUrl}?d=404#hash-mock`);
      expect(uut.patchGravatarUrl(urlShort)).toEqual(`${shortGravatarUrl}?d=404#hash-mock`);
    });

    it('should be applied for valid gravatar links with both short- and longhand default url-param', () => {
      const url = `${gravatarUrl}?d=mock&default=mock-long`;
      const urlShort = `${shortGravatarUrl}?d=mock&default=mock-long`;
      expect(uut.patchGravatarUrl(url)).toEqual(`${gravatarUrl}?d=404`);
      expect(uut.patchGravatarUrl(urlShort)).toEqual(`${shortGravatarUrl}?d=404`);
    });

    it('should keep existing non-default params', () => {
      const url = `${gravatarUrl}?d=mock&mock1=param1&mock2=param2`;
      const urlShort = `${shortGravatarUrl}?d=mock&mock1=param1&mock2=param2`;
      expect(uut.patchGravatarUrl(url)).toEqual(`${gravatarUrl}?d=404&mock1=param1&mock2=param2`);
      expect(uut.patchGravatarUrl(urlShort)).toEqual(`${shortGravatarUrl}?d=404&mock1=param1&mock2=param2`);
    });
  });
});
