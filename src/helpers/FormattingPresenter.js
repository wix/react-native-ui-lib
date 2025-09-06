import _isNil from "lodash/isNil";
import _toString from "lodash/toString";
export function formatLastItemLabel(label, options) {
  const {
    shouldAddPlus = true,
    maxPlusLimit
  } = options || {};
  if (typeof label !== 'number') {
    return label;
  }
  let formattedLabel;
  const roundedNumber = _toString(Math.round(label));
  if (label < 1000) {
    formattedLabel = `${label}`;
  } else if (label >= 10000000) {
    formattedLabel = `${roundedNumber.slice(0, -6)}m`;
  } else if (label >= 1000000) {
    formattedLabel = `${parseInt(roundedNumber.slice(0, -5)) / 10}m`;
  } else {
    formattedLabel = `${roundedNumber.slice(0, -3)}k`;
  }
  const isInPlusRange = !_isNil(maxPlusLimit) ? formattedLabel.length <= maxPlusLimit : shouldAddPlus;
  if (shouldAddPlus && isInPlusRange) {
    return `+${formattedLabel}`;
  }
  return formattedLabel;
}