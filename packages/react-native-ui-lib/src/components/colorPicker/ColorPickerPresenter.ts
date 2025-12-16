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
export function getHexColor(text: string) {
  if (!Colors.isTransparent(text)) {
    const trimmed = text.replace(/\s+/g, '');
    const hex = `#${trimmed}`;
    return hex;
  }
  return text;
}

export function getValidColorString(text?: string) {
  if (text) {
    const hex = getHexColor(text);

    if (Colors.isValidHex(hex)) {
      return {hex, valid: true};
    }
  }
  return {undefined, valid: false};
}

export function getHexString(color: HSLColor) {
  return _.toUpper(Colors.getHexString(color));
}
export function getTextColor(color: string) {
  return Colors.isDark(color) ? Colors.white : Colors.grey10;
}
