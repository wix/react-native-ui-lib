import _ from 'lodash';
//@ts-ignore
import Color from 'color';
import {OpaqueColorValue} from 'react-native';
import tinycolor from 'tinycolor2';
import {colorsPalette} from './colorsPalette';
import DesignTokens from './designTokens';
import DesignTokensDM from './designTokensDM';
//@ts-ignore
import ColorName from './colorName';
import Scheme, {Schemes, SchemeType} from './scheme';
import type {ExtendTypeWith} from '../typings/common';

export type DesignToken = {semantic?: [string]; resource_paths?: [string]; toString: Function};
export type TokensOptions = {primaryColor: string};
export type GetColorTintOptions = {avoidReverseOnDark?: boolean};
export type GetColorByHexOptions = {validColors?: string[]};
export type GeneratePaletteOptions = {
  /** Whether to adjust the lightness of very light colors (generating darker palette) */
  adjustLightness?: boolean;
  /** Whether to adjust the saturation of colors with high lightness and saturation (unifying saturation level throughout palette) */
  adjustSaturation?: boolean;
  /** Whether to add two extra dark colors usually used for dark mode (generating a palette of 10 instead of 8 colors) */
  addDarkestTints?: boolean;
  /** Whether to reverse the color palette to generate dark mode palette (pass 'true' to generate the same palette for both light and dark modes) */
  avoidReverseOnDark?: boolean;
}
export class Colors {
  [key: string]: any;
  shouldSupportDarkMode = false;

  constructor() {
    const colors = Object.assign(colorsPalette);
    Object.assign(this, colors);
    this.loadSchemes({light: DesignTokens, dark: DesignTokensDM});

    Scheme.addChangeListener(() => {
      Object.assign(this, Scheme.getScheme());
    });
  }
  /**
   * Load custom set of colors
   * arguments:
   * colors - map of keys and colors values e.g {grey10: '#20303C', grey20: '#43515C'}
   */
  loadColors(colors: {[key: string]: string}) {
    _.forEach(colors, (value, key) => {
      this[key] = value;
    });
  }
  /**
   * Load set of schemes for light/dark mode
   * arguments:
   * schemes - two sets of map of colors e.g {light: {screen: 'white'}, dark: {screen: 'black'}}
   */
  loadSchemes(schemes: Schemes) {
    Scheme.loadSchemes(schemes);
    Object.assign(this, Scheme.getScheme());
  }

  /**
   * Load light and dark schemes based on generated design tokens
   * @param color - palette color
   */
  loadDesignTokens(options: TokensOptions) {
    this.loadSchemes({
      light: this.generateDesignTokens(options.primaryColor),
      dark: this.generateDesignTokens(options.primaryColor, true)
    });
  }

  /**
   * Get app's current color scheme
   */
  getScheme(): 'light' | 'dark' {
    return Scheme.getSchemeType();
  }

  /**
   * Set color scheme for app
   * arguments:
   * scheme - color scheme e.g light/dark/default
   */
  setScheme(scheme: SchemeType) {
    Scheme.setScheme(scheme);
  }

  /**
   * Support listening to Appearance changes
   * and change the design tokens accordingly
   */
  supportDarkMode() {
    this.shouldSupportDarkMode = true;
  }

  /**
   * Add alpha to hex or rgb color
   * arguments:
   * p1 - hex color / R part of RGB
   * p2 - opacity / G part of RGB
   * p3 - B part of RGB
   * p4 - opacity
   */
  rgba(p1: string, p2: number): string;
  rgba(p1: number, p2: number, p3: number, p4: number): string;
  rgba(p1: number | string, p2: number, p3?: number, p4?: number): string {
    let hex;
    let opacity;
    let red;
    let green;
    let blue;

    // Handle design token PlatformColor object
    if (typeof p1 === 'object') {
      p1 = colorStringValue(p1);
    }

    if (arguments.length === 2 && typeof p1 === 'string') {
      hex = p1;
      opacity = p2;

      hex = validateHex(hex);
      red = parseInt(hex.substring(0, 2), 16);
      green = parseInt(hex.substring(2, 4), 16);
      blue = parseInt(hex.substring(4, 6), 16);
    } else if (arguments.length === 4 && typeof p1 === 'number') {
      red = validateRGB(p1);
      green = validateRGB(p2);
      blue = validateRGB(p3!);
      opacity = p4;
    } else {
      throw new Error('rgba can work with either 2 or 4 arguments');
    }
    return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
  }

  getBackgroundKeysPattern() {
    return /^(bg-|background-)/;
  }

  isEmpty(color: string) {
    if (_.isNil(color) || color === 'transparent') {
      return true;
    }

    try {
      Color(color);
      return false;
    } catch (error) {
      console.warn('Colors.isEmpty failed:', error);
      return true;
    }
  }

  getColorName(colorValue: string) {
    const color = colorStringValue(colorValue);
    return ColorName.name(color)[1];
  }

  getSystemColorByHex(colorValue: string, options: GetColorByHexOptions = {}) {
    const color = colorStringValue(colorValue);
    const results: string[] = [];
    const validColors = options?.validColors;

    for (const [key, value] of Object.entries(this)) {
      if (value.toString() === color) {
        if (validColors?.includes(key.split(/[0-9]/)[0])) {
          return key;
        } else {
          results.push(key);
        }
      }
    }

    return validColors ? undefined : results[0];
  }

  shouldReverseOnDark = (avoidReverseOnDark?: boolean) => !avoidReverseOnDark && this.shouldSupportDarkMode && Scheme.getSchemeType() === 'dark';
  
  getColorTint(colorValue: string | OpaqueColorValue, tintKey: string | number, options: GetColorTintOptions = {}) {
    if (_.isUndefined(tintKey) || isNaN(tintKey as number) || _.isUndefined(colorValue)) {
      // console.error('"Colors.getColorTint" must accept a color and tintKey params');
      return colorValue;
    }

    const color = colorStringValue(colorValue);

    if (color === 'transparent') {
      return color;
    }

    const colorKey = _.findKey(this, (_value, key) => this[key] === color);

    if (colorKey) {
      const colorKeys = [1, 5, 10, 20, 30, 40, 50, 60, 70, 80];
      const keyIndex = _.indexOf(colorKeys, Number(tintKey));
      const key = 
        this.shouldReverseOnDark(options?.avoidReverseOnDark) ? colorKeys[colorKeys.length - 1 - keyIndex] : tintKey;
      const requiredColorKey = `${colorKey.slice(0, -2)}${key}`;
      const requiredColorKey1 = `${colorKey.slice(0, -1)}${key}`;
      const requiredColor = this[requiredColorKey] || this[requiredColorKey1];
      if (_.isUndefined(requiredColor)) {
        return this.getTintedColorForDynamicHex(color, tintKey);
      }
      return requiredColor;
    }
    return this.getTintedColorForDynamicHex(color, tintKey);
  }

  private getTintedColorForDynamicHex(color: string, tintKey: string | number) {
    // Handles dynamic colors (non uilib colors)
    let tintLevel = Math.floor(Number(tintKey) / 10);
    tintLevel = Math.max(1, tintLevel);
    tintLevel = Math.min(8, tintLevel);

    const colorsPalette = this.generateColorPalette(color);
    return colorsPalette[tintLevel - 1];
  }

  private generatePalette = _.memoize((color: string, options?: GeneratePaletteOptions): string[] => {    
    const hsl = Color(color).hsl();
    const lightness = Math.round(hsl.color[2]);
    const lightColorsThreshold = options?.adjustLightness && this.shouldGenerateDarkerPalette(color) ? 5 : 0;
    const ls = [hsl.color[2]];
    const isWhite = lightness === 100;
    const lightnessLevel = options?.addDarkestTints ? (isWhite ? 5 : 0) : 20;

    let l = lightness - 10;
    while (l >= lightnessLevel - lightColorsThreshold) { // darker tints
      ls.unshift(l);
      l -= 10;
    }

    l = lightness + 10;
    while (l < 100 - lightColorsThreshold) { // lighter tints
      ls.push(l);
      l += 10;
    }

    const tints: string[] = [];
    _.forEach(ls, e => {
      const tint = generateColorTint(color, e);
      tints.push(tint);
    });

    const size = options?.addDarkestTints ? 10 : 8;
    const sliced = tints.slice(0, size);
    const adjusted = options?.adjustSaturation && adjustSaturation(sliced, color);
    return adjusted || sliced;
  }, generatePaletteCacheResolver);

  defaultOptions = {adjustLightness: true, adjustSaturation: true, addDarkestTints: false, avoidReverseOnDark: false};

  generateColorPalette = _.memoize((color: string, options?: GeneratePaletteOptions): string[] => {
    const _options = {...this.defaultOptions, ...options};
    const palette = this.generatePalette(color, _options);
    return this.shouldReverseOnDark(_options?.avoidReverseOnDark) ? _.reverse(palette) : palette;
  }, generatePaletteCacheResolver);

  private generateDesignTokens(primaryColor: string, dark?: boolean) {
    let colorPalette: string[] = this.generatePalette(primaryColor);
    if (dark) {
      colorPalette = _.reverse(colorPalette);
    }
    const color30 = colorPalette[2];
    const color50 = colorPalette[4];
    const color70 = colorPalette[6];
    const color80 = colorPalette[7];

    const isPrimaryColorDark = this.isDark(primaryColor);
    let mainColor = isPrimaryColorDark ? primaryColor : color30;
    if (dark) {
      mainColor = isPrimaryColorDark ? color30 : primaryColor;
    }
    return {
      $backgroundPrimaryHeavy: mainColor,
      $backgroundPrimaryLight: color80,
      $backgroundPrimaryMedium: color70,
      $iconPrimary: mainColor,
      $iconPrimaryLight: color50,
      $textPrimary: mainColor,
      $outlinePrimary: mainColor
    };
  }

  private shouldGenerateDarkerPalette(color: string) {
    const hsl = Color(color).hsl();
    const hue = hsl.color[0];
    return _.inRange(hue, 51, 184);
  }

  isDark(colorValue: string | OpaqueColorValue, darkThreshold = 0.55) {
    const color = colorValue === null ? undefined : colorStringValue(colorValue);
    const lum = tinycolor(color).getLuminance();
    return lum < darkThreshold;
  }
  isValidHex(string: string) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(string);
  }

  getHexString(color: tinycolor.ColorInput) {
    return tinycolor(color).toHexString();
  }
  getHSL(color?: string) {
    return tinycolor(color).toHsl();
  }
  isTransparent(color?: string) {
    return color && _.toUpper(color) === _.toUpper('transparent');
  }
  areEqual(colorAValue: string | OpaqueColorValue, colorBValue: string | OpaqueColorValue) {
    const colorA = colorStringValue(colorAValue);
    const colorB = colorStringValue(colorBValue);
    return _.toLower(colorA) === _.toLower(colorB);
  }
  isDesignToken(color?: DesignToken) {
    return !!(color?.semantic || color?.resource_paths);
  }
}

function colorStringValue(color: string | object) {
  return color?.toString();
}

function adjustSaturation(colors: string[], color: string) {
  let array;
  const lightnessLevel = 80;
  const saturationLevel = 60;
  const hsl = Color(color).hsl();
  const lightness = Math.round(hsl.color[2]);

  if (lightness > lightnessLevel) {
    const saturation = Math.round(hsl.color[1]);
    if (saturation > saturationLevel) {
      array = _.map(colors, e => (e !== color ? addSaturation(e, saturationLevel) : e));
    }
  }
  return array;
}

function addSaturation(color: string, saturation: number): string {
  const hsl = Color(color).hsl();
  hsl.color[1] = saturation;
  return hsl.hex();
}

function generateColorTint(color: string, tintLevel: number): string {
  const hsl = Color(color).hsl();
  hsl.color[2] = tintLevel;
  return hsl.hex();
}

function validateRGB(value: number) {
  if (isNaN(value) || value > 255 || value < 0) {
    throw new Error(`${value} is invalid rgb code, please use number between 0-255`);
  }
  return value;
}

function validateHex(value: string) {
  if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
    throw new Error(`${value} is invalid hex color`);
  }
  value = value.replace('#', '');
  if (value.length === 3) {
    value = threeDigitHexToSix(value);
  }
  return value;
}

function threeDigitHexToSix(value: string) {
  return value.replace(/./g, '$&$&');
}

function generatePaletteCacheResolver(color: string, options?: GeneratePaletteOptions) {
  return `${color}_${options ? JSON.stringify(options) : ''}`;
} 

const TypedColors = Colors as ExtendTypeWith<typeof Colors, typeof colorsPalette & typeof DesignTokens>;
const colorObject = new TypedColors();
colorObject.loadColors(colorsPalette);
export default colorObject;
