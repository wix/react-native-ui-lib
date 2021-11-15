import {isEmpty, toLower} from 'lodash';
import {StyleProp, TextStyle} from 'react-native';

interface TextPart {
  string: string;
  shouldStyle: boolean;
}

interface StyledTextPart {
  string: string;
  style?: StyleProp<TextStyle>;
}

function getPartsToStyle(targetString = '', stringToStyle: undefined | string | string[]): TextPart[] {
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
  } while (highlightIndex !== -1 && targetString.length > 0);

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

// eslint-disable-next-line max-params
function getUnifiedStyle(string: string,
  shouldStyle1: boolean,
  withStyle1: StyleProp<TextStyle>,
  noStyle1: StyleProp<TextStyle>,
  shouldStyle2: boolean,
  withStyle2: StyleProp<TextStyle>,
  noStyle2: StyleProp<TextStyle>): StyledTextPart {
  return {
    string,
    style: [shouldStyle1 ? withStyle1 : noStyle1, shouldStyle2 ? withStyle2 : noStyle2]
  };
}

// eslint-disable-next-line max-params
function unifyTextPartsStyles(targetString = '',
  textParts1: TextPart[] | undefined,
  withStyle1: StyleProp<TextStyle>,
  noStyle1: StyleProp<TextStyle>,
  textParts2: TextPart[] | undefined,
  withStyle2: StyleProp<TextStyle>,
  noStyle2: StyleProp<TextStyle>): StyledTextPart[] | undefined {
  const result: StyledTextPart[] = [];
  if (!textParts1 && !textParts2) {
    return undefined;
  } else if (!textParts1 || !textParts2) {
    const is1 = !textParts1;
    const textParts = is1 ? textParts1 : textParts2;
    const withStyle = is1 ? withStyle1 : withStyle2;
    const noStyle = is1 ? noStyle1 : noStyle2;
    for (let i = 0; i < textParts!.length; ++i) {
      result.push({string: textParts![i].string, style: textParts![i].shouldStyle ? withStyle : noStyle});
    }

    return result;
  }

  let arrayIndex1 = -1,
    arrayIndex2 = -1;
  let totalLength1 = 0,
    totalLength2 = 0;
  let startIndex = 0,
    endIndex;
  while (arrayIndex1 < textParts1.length - 1 || arrayIndex2 < textParts2.length - 1) {
    if (totalLength1 === totalLength2) {
      ++arrayIndex1;
      ++arrayIndex2;
      totalLength1 += textParts1[arrayIndex1].string.length;
      totalLength2 += textParts2[arrayIndex2].string.length;
    } else if (totalLength1 > totalLength2) {
      ++arrayIndex2;
      totalLength2 += textParts2[arrayIndex2].string.length;
    } else {
      ++arrayIndex1;
      totalLength1 += textParts1[arrayIndex1].string.length;
    }

    endIndex = Math.min(totalLength1, totalLength2);
    result.push(getUnifiedStyle(targetString.substring(startIndex, endIndex),
      textParts1[arrayIndex1].shouldStyle,
      withStyle1,
      noStyle1,
      textParts2[arrayIndex2].shouldStyle,
      withStyle2,
      noStyle2));
    startIndex = endIndex;
  }

  return result;
}

export {getPartsToStyle, unifyTextPartsStyles, TextPart, StyledTextPart, getTextPartsToStyle, getArrayPartsToStyle};
