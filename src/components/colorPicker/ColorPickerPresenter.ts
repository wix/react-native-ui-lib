import _ from 'lodash';
import {Colors} from '../../style';

export type HSLColor = ReturnType<typeof Colors.getHSL>;
export const BORDER_RADIUS = 12;

export function getColorValue(color?: string) {
  if (!color) {
    return;
  }
  return color.replace('#', '');
}

export function isTransparent(color?: string) {
  'worklet';
  return color && color.toUpperCase() === 'transparent'.toUpperCase();
}
export function getHexColor(text: string) {
  'worklet';
  if (!isTransparent(text)) {
    const trimmed = text.replace(/\s+/g, '');
    const hex = `#${trimmed}`;
    return hex;
  }
  return text;
}

export function isValidHex(string: string) {
  'worklet';
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(string);
}

export function getValidColorString(text?: string) {
  'worklet';
  if (text) {
    const hex = getHexColor(text);

    if (isValidHex(hex)) {
      return {hex, valid: true};
    }
  }
  return {undefined, valid: false};
}

export function hslToHex(hsl: {h: number; s: number; l: number}) {
  'worklet';
  let {h, s, l} = hsl;
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0'); // convert to Hex and prefix "0" if needed
  };
  return `${f(0)}${f(8)}${f(4)}`;
}

export function getHexString(color: HSLColor) {
  return _.toUpper(Colors.getHexString(color));
}
export function getTextColor(color: string) {
  return Colors.isDark(color) ? Colors.white : Colors.grey10;
}
