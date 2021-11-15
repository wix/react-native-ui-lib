import {isEmpty, toLower} from 'lodash';

interface TextPart {
  string: string;
  shouldStyle: boolean;
}

function getPartsToStyle(targetString = '', stringToStyle: string | string[]): TextPart[] {
  if (typeof stringToStyle === 'string') {
    if (isEmpty(stringToStyle.trim())) {
      return [{string: targetString, shouldStyle: false}];
    }
    return getTextPartsToStyle(targetString, stringToStyle);
  } else {
    return getArrayPartsToStyle(targetString, stringToStyle);
  }
}

function getTextPartsToStyle(targetString = '', stringToStyle = ''): TextPart[] {
  if (stringToStyle === '') {
    return [{string: targetString, shouldStyle: false}];
  }
  const textParts = [];
  let highlightIndex;
  do {
    highlightIndex = targetString.toLowerCase().indexOf(stringToStyle.toLowerCase());
    if (highlightIndex !== -1) {
      if (highlightIndex > 0) {
        textParts.push({string: targetString.substring(0, highlightIndex), shouldStyle: false});
      }
      textParts.push({string: targetString.substr(highlightIndex, stringToStyle.length), shouldStyle: true});
      targetString = targetString.substr(highlightIndex + stringToStyle.length);
    } else {
      textParts.push({string: targetString, shouldStyle: false});
    }
  } while (highlightIndex !== -1);

  return textParts;
}

function getArrayPartsToStyle(targetString = '', stringToStyle = ['']): TextPart[] {
  const target = toLower(targetString);
  const indices = [];
  let index = 0;
  let lastWordLength = 0;
  for (let j = 0; j < stringToStyle.length; j++) {
    const word = toLower(stringToStyle[j]);
    if (word.length === 0) {
      break;
    }

    const targetSuffix = target.substring(index + lastWordLength);
    const i = targetSuffix.indexOf(word);
    if (i >= 0) {
      const newIndex = index + lastWordLength + i;
      indices.push({start: index + lastWordLength + i, end: index + lastWordLength + i + word.length});
      index = newIndex;
      lastWordLength = word.length;
    } else {
      break;
    }
  }
  const textParts = [];
  for (let k = 0; k < indices.length; k++) {
    if (k === 0 && indices[k].start !== 0) {
      textParts.push({string: targetString.substring(0, indices[k].start), shouldStyle: false});
    }
    textParts.push({string: targetString.substring(indices[k].start, indices[k].end), shouldStyle: true});
    if (k === indices.length - 1) {
      textParts.push({string: targetString.substring(indices[k].end), shouldStyle: false});
    } else {
      textParts.push({string: targetString.substring(indices[k].end, indices[k + 1].start), shouldStyle: false});
    }
  }
  if (textParts.length === 0) {
    textParts.push({string: targetString, shouldStyle: false});
  }

  return textParts;
}

export {getPartsToStyle, TextPart, getTextPartsToStyle, getArrayPartsToStyle};
