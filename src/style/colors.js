import _ from 'lodash';
import Color from 'color';
import {colorsPalette} from './colorsPalette';


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
    return new RegExp(
      _.chain(this)
        .keys()
        .map(key => [`bg-${key}`, `background-${key}`])
        .flatten()
        .join('|')
        .value(),
    );
  }

  getColorTint(color, tintKey) {
    if (_.isUndefined(tintKey) || isNaN(tintKey) || _.isUndefined(color)) {
      console.error('"Colors.getColorTint" must accept a color and tintKey params');
      return color;
    }

    const colorKey = _.findKey(this, (value, key) => this[key] === color);

    if (colorKey) {
      const requiredColorKey = `${colorKey.slice(0, -2)}${tintKey}`;
      const requiredColor = this[requiredColorKey];
      
      if (_.isUndefined(requiredColor)) {
        console.warn('"Colors.getColorTint" could not find color with this tint');
        return color;
      }
      return requiredColor;
    } else { 
      // Handles dynamic colors (non uilib colors)
      let tintLevel = Math.floor(Number(tintKey) / 10);
      tintLevel = Math.max(1, tintLevel);
      tintLevel = Math.min(8, tintLevel);

      return generateColorTint(color, tintLevel);
    }
  }

  generateColorPalette(color) {
    const tints = [];
    for (let i = 1; i <= 8; i++) {
      tints.push(generateColorTint(color, i));
    }
    return tints;
  }
}

function generateColorTint(color, tintLevel) {
  if (color && tintLevel) {
    const BASE_COLOR_LEVEL = 3;
    
    if (tintLevel < BASE_COLOR_LEVEL) {
      const darkRatios = [0.13, 0.08];
      const darkRatio = darkRatios[tintLevel - 1];
      return Color(color).darken(darkRatio).hex();
    } else if (tintLevel > BASE_COLOR_LEVEL) {
      const lightRatios = [0.27, 0.55, 0.72, 0.83, 0.9];
      const lightRatio = lightRatios[tintLevel - 4];
      return Color(color).mix(Color('#ffffff'), lightRatio).hex();
    }
  }
  return color;
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
