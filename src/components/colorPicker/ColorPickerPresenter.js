import _toUpper from "lodash/toUpper";
import { Colors } from "../../style";
export const BORDER_RADIUS = 12;
export function getColorValue(color) {
  if (!color) {
    return;
  }
  return color.replace('#', '');
}
export function getHexColor(text) {
  if (!Colors.isTransparent(text)) {
    const trimmed = text.replace(/\s+/g, '');
    const hex = `#${trimmed}`;
    return hex;
  }
  return text;
}
export function getValidColorString(text) {
  if (text) {
    const hex = getHexColor(text);
    if (Colors.isValidHex(hex)) {
      return {
        hex,
        valid: true
      };
    }
  }
  return {
    undefined,
    valid: false
  };
}
export function getHexString(color) {
  return _toUpper(Colors.getHexString(color));
}
export function getTextColor(color) {
  return Colors.isDark(color) ? Colors.white : Colors.grey10;
}