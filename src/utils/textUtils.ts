import {isEmpty, toLower} from 'lodash';
import {HighlightString, HighlightStringProps} from '../components/text';

interface TextPartByHighlight extends HighlightStringProps {
  shouldHighlight: boolean;
}

function getPartsByHighlight(targetString = '', highlightString: HighlightString | HighlightString[]): TextPartByHighlight[] {
  if (!Array.isArray(highlightString)) {
    const stringValue = getHighlightStringValue(highlightString);
    if (isEmpty(stringValue.trim())) {
      return [{string: targetString, shouldHighlight: false}];
    }
    return getTextPartsByHighlight(targetString, highlightString);
  } else {
    return getArrayPartsByHighlight(targetString, highlightString);
  }
}

function getHighlightStringValue(highlightString: HighlightString): string {
  if (isHighlightStringProps(highlightString)) {
    return highlightString.string;
  } else {
    return highlightString;
  }
}

function isHighlightStringProps(highlightString: HighlightString): highlightString is HighlightStringProps {
  return typeof highlightString !== 'string';
}

function getTextPartsByHighlight(targetString = '', highlightString: HighlightString = ''): TextPartByHighlight[] {
  const stringValue = getHighlightStringValue(highlightString);
  if (stringValue === '') {
    return [{string: targetString, shouldHighlight: false}];
  }
  const textParts = [];
  let highlightIndex;
  do {
    highlightIndex = targetString.toLowerCase().indexOf(stringValue.toLowerCase());
    if (highlightIndex !== -1) {
      if (highlightIndex > 0) {
        textParts.push({string: targetString.substring(0, highlightIndex), shouldHighlight: false});
      }
      const highlightStringProps = isHighlightStringProps(highlightString) ? {
        onPress: highlightString.onPress,
        style: highlightString.style,
        testID: highlightString.testID
      } : {};
      textParts.push({
        string: targetString.substr(highlightIndex, stringValue.length),
        shouldHighlight: true,
        ...highlightStringProps
      });
      targetString = targetString.substr(highlightIndex + stringValue.length);
    } else {
      textParts.push({string: targetString, shouldHighlight: false});
    }
  } while (highlightIndex !== -1 && targetString.length > 0);

  return textParts;
}

function getArrayPartsByHighlight(targetString = '', highlightString: HighlightString[] = ['']): TextPartByHighlight[] {
  const target = toLower(targetString);
  const indices = [];
  let index = 0;
  let lastWordLength = 0;
  for (let j = 0; j < highlightString.length; j++) {
    const stringValue = getHighlightStringValue(highlightString[j]);
    const word = toLower(stringValue);
    if (word.length === 0) {
      break;
    }

    const targetSuffix = target.substring(index + lastWordLength);
    const i = targetSuffix.indexOf(word);
    if (i >= 0) {
      const newIndex = index + lastWordLength + i;
      indices.push({
        start: index + lastWordLength + i,
        end: index + lastWordLength + i + word.length,
        highlightStringIndex: j
      });
      index = newIndex;
      lastWordLength = word.length;
    } else {
      break;
    }
  }
  const textParts = [];
  for (let k = 0; k < indices.length; k++) {
    if (k === 0 && indices[k].start !== 0) {
      textParts.push({string: targetString.substring(0, indices[k].start), shouldHighlight: false});
    }
    const currentHighlightString = highlightString[indices[k].highlightStringIndex];
    const highlightStringProps = isHighlightStringProps(currentHighlightString) ? {
      onPress: currentHighlightString.onPress,
      style: currentHighlightString.style,
      testID: currentHighlightString.testID
    } : {};
    textParts.push({
      string: targetString.substring(indices[k].start, indices[k].end),
      shouldHighlight: true,
      ...highlightStringProps
    });
    if (indices[k].end < targetString.length) {
      if (k === indices.length - 1) {
        textParts.push({string: targetString.substring(indices[k].end), shouldHighlight: false});
      } else {
        textParts.push({string: targetString.substring(indices[k].end, indices[k + 1].start), shouldHighlight: false});
      }
    }
  }
  if (textParts.length === 0) {
    textParts.push({string: targetString, shouldHighlight: false});
  }

  return textParts;
}

export {getPartsByHighlight, getTextPartsByHighlight, getArrayPartsByHighlight};
