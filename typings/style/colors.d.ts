
export type ColorValue = string;

export type ColorName =
  | 'dark10'
  | 'dark20'
  | 'dark30'
  | 'dark40'
  | 'dark50'
  | 'dark60'
  | 'dark70'
  | 'dark80'
  | 'blue10'
  | 'blue20'
  | 'blue30'
  | 'blue40'
  | 'blue50'
  | 'blue60'
  | 'blue70'
  | 'blue80'
  | 'cyan10'
  | 'cyan20'
  | 'cyan30'
  | 'cyan40'
  | 'cyan50'
  | 'cyan60'
  | 'cyan70'
  | 'cyan80'
  | 'green10'
  | 'green20'
  | 'green30'
  | 'green40'
  | 'green50'
  | 'green60'
  | 'green70'
  | 'green80'
  | 'yellow10'
  | 'yellow20'
  | 'yellow30'
  | 'yellow40'
  | 'yellow50'
  | 'yellow60'
  | 'yellow70'
  | 'yellow80'
  | 'orange10'
  | 'orange20'
  | 'orange30'
  | 'orange40'
  | 'orange50'
  | 'orange60'
  | 'orange70'
  | 'orange80'
  | 'red10'
  | 'red20'
  | 'red30'
  | 'red40'
  | 'red50'
  | 'red60'
  | 'red70'
  | 'red80'
  | 'purple10'
  | 'purple20'
  | 'purple30'
  | 'purple40'
  | 'purple50'
  | 'purple60'
  | 'purple70'
  | 'purple80'
  | 'violet10'
  | 'violet20'
  | 'violet30'
  | 'violet40'
  | 'violet50'
  | 'violet60'
  | 'violet70'
  | 'violet80'
  | 'white'
  | 'black';

export interface HSLValue {
  h: number;
  s: number;
  l: number;
  a: number;
}

export declare class ColorsClass {
  loadColors(colors: object): void;
  rgba(p1: string | number, p2: number, p3: number, p4: number): ColorValue;
  isEmpty(color: ColorValue): boolean;
  getColorTint(color: ColorValue, tintKey: number): any;
  getTintedColorForDynamicHex(color: ColorValue, tintKey: number): any;
  isDark(color: ColorValue): boolean;
  isValidHex(string: string): boolean;
  getHexString(color: ColorValue): string;
  getHSL(color: ColorValue): HSLValue;
  isTransparent(color: ColorValue): boolean;
  areEqual(colorA: ColorValue, colorB: ColorValue): boolean;
}

export const Colors: ColorsClass & Readonly<Record<ColorName, ColorValue>>;
