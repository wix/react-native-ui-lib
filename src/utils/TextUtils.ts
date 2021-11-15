import _ from 'lodash';

function getPartsByHighlight(targetString = '', highlightString: string | string[]) {
  if (typeof highlightString === 'string') {
    if (_.isEmpty(highlightString.trim())) {
      return [{string: targetString, shouldHighlight: false}];
    }
    return getTextPartsByHighlight(targetString, highlightString);
  } else {
    return getArrayPartsByHighlight(targetString, highlightString);
  }
}

function getTextPartsByHighlight(targetString = '', highlightString = '') {
  if (highlightString === '') {
    return [{string: targetString, shouldHighlight: false}];
  }
  const textParts = [];
  let highlightIndex;
  do {
    highlightIndex = targetString.toLowerCase().indexOf(highlightString.toLowerCase());
    if (highlightIndex !== -1) {
      if (highlightIndex > 0) {
        textParts.push({string: targetString.substring(0, highlightIndex), shouldHighlight: false});
      }
      textParts.push({string: targetString.substr(highlightIndex, highlightString.length), shouldHighlight: true});
      targetString = targetString.substr(highlightIndex + highlightString.length);
    } else {
      textParts.push({string: targetString, shouldHighlight: false});
    }
  } while (highlightIndex !== -1);

  return textParts;
}

function getArrayPartsByHighlight(targetString = '', highlightString = ['']) {
  const target = _.toLower(targetString);
  const indices = [];
  let index = 0;
  let lastWordLength = 0;
  for (let j = 0; j < highlightString.length; j++) {
    const word = _.toLower(highlightString[j]);
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
  const parts = [];
  for (let k = 0; k < indices.length; k++) {
    if (k === 0 && indices[k].start !== 0) {
      parts.push({string: targetString.substring(0, indices[k].start), shouldHighlight: false});
    }
    parts.push({string: targetString.substring(indices[k].start, indices[k].end), shouldHighlight: true});
    if (k === indices.length - 1) {
      parts.push({string: targetString.substring(indices[k].end), shouldHighlight: false});
    } else {
      parts.push({string: targetString.substring(indices[k].end, indices[k + 1].start), shouldHighlight: false});
    }
  }
  if (parts.length === 0) {
    parts.push({string: targetString, shouldHighlight: false});
  }

  return parts;
}

export {getPartsByHighlight, getTextPartsByHighlight, getArrayPartsByHighlight};
