import _ from 'lodash';
import Color from 'color';
import tinycolor from 'tinycolor2';
import {colorsPalette} from './colorsPalette';
import ColorName from './colorName';

class Colors {
  /**
   * Load custom set of colors
   * arguments:
   * colors - map of keys and colors values e.g {dark10: '#20303C', dark20: '#43515C'}
   */
  loadColors(colors) {
    _.forEach(colors, (value, key) => {
      this[key] = value;
    });
  }

  /**
   * Add alpha to hex or rgb color
   * arguments:
   * p1 - hex color / R part of RGB
   * p2 - opacity / G part of RGB
   * p3 - B part of RGB
   * p4 - opacity
   */
  rgba(p1, p2, p3, p4) {
    let hex;
    let opacity;
    let red;
    let green;
    let blue;

    if (arguments.length === 2) {
      hex = p1;
      opacity = p2;

      hex = validateHex(hex);
      red = parseInt(hex.substring(0, 2), 16);
      green = parseInt(hex.substring(2, 4), 16);
      blue = parseInt(hex.substring(4, 6), 16);
    } else if (arguments.length === 4) {
      red = validateRGB(p1);
      green = validateRGB(p2);
      blue = validateRGB(p3);
      opacity = p4;
    } else {
      throw new Error('rgba can work with either 2 or 4 arguments');
    }
    return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
  }

  getBackgroundKeysPattern() {
    return /^(bg-|background-)/;
  }

  isEmpty(color) {
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

  getColorTint(color, tintKey) {
    if (_.isUndefined(tintKey) || isNaN(tintKey) || _.isUndefined(color)) {
      // console.error('"Colors.getColorTint" must accept a color and tintKey params');
      return color;
    }

    if (color === 'transparent') {
      return color;
    }

    const colorKey = _.findKey(this, (value, key) => this[key] === color);

    if (colorKey) {
      const requiredColorKey = `${colorKey.slice(0, -2)}${tintKey}`;
      const requiredColor = this[requiredColorKey];

      if (_.isUndefined(requiredColor)) {
        return this.getTintedColorForDynamicHex(color, tintKey);
      }
      return requiredColor;
    }
    return this.getTintedColorForDynamicHex(color, tintKey);
  }

  getColorName(color) {
    return ColorName.name(color)[1];
  }

  getTintedColorForDynamicHex(color, tintKey) {
    // Handles dynamic colors (non uilib colors)
    let tintLevel = Math.floor(Number(tintKey) / 10);
    tintLevel = Math.max(1, tintLevel);
    tintLevel = Math.min(8, tintLevel);

    const colorsPalette = this.generateColorPalette(color);
    return colorsPalette[tintLevel - 1];
  }

  generateColorPalette = _.memoize(color => {
    const hsl = Color(color).hsl();
    const lightness = Math.round(hsl.color[2]);

    const ls = [hsl.color[2]];
    let l = lightness - 10;
    while (l >= 20) {
      ls.unshift(l);
      l -= 10;
    }

    l = lightness + 10;
    while (l < 100) {
      ls.push(l);
      l += 10;
    }

    const tints = [];
    _.forEach(ls, e => {
      const tint = generateColorTint(color, e);
      tints.push(tint);
    });

    const sliced = tints.slice(0, 8);
    const adjusted = adjustSaturation(sliced, color);
    return adjusted || sliced;
  });

  isDark(color) {
    const lum = tinycolor(color).getLuminance();
    return lum < 0.55;
  }
  isValidHex(string) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(string);
  }
  getHexString(color) {
    return tinycolor(color).toHexString();
  }
  getHSL(color) {
    return tinycolor(color).toHsl();
  }
  isTransparent(color) {
    return _.toUpper(color) === _.toUpper('transparent');
  }
  areEqual(colorA, colorB) {
    return _.toLower(colorA) === _.toLower(colorB);
  }
}

function adjustSaturation(colors, color) {
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

function addSaturation(color, saturation) {
  const hsl = Color(color).hsl();
  hsl.color[1] = saturation;
  return hsl.hex();
}

function generateColorTint(color, tintLevel) {
  const hsl = Color(color).hsl();
  hsl.color[2] = tintLevel;
  return hsl.hex();
}

function validateRGB(value) {
  if (isNaN(value) || value > 255 || value < 0) {
    throw new Error(`${value} is invalid rgb code, please use number between 0-255`);
  }
  return value;
}

function validateHex(value) {
  if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
    throw new Error(`${value} is invalid hex color`);
  }
  return value.replace('#', '');
}

const colorObject = new Colors();
colorObject.loadColors(colorsPalette);

export default colorObject;
