import * as uut from '../../../src/helpers/AvatarHelper';
import Colors from '../../../src/style/colors';

describe('services/AvatarService', () => {
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
      Colors.violet20,
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
});
