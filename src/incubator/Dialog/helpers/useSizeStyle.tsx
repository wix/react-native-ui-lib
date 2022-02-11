import {isUndefined} from 'lodash';
import {useMemo} from 'react';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {Constants} from '../../../commons/new';
import {StyleProps} from '../types';

const PERCENTAGE_STRING_REGEX = '([0-9]*)%';
// exporting for tests
export function getSizeFromPercentage(size: string, totalSize: number) {
  const matches = size.match(PERCENTAGE_STRING_REGEX);
  if (matches && matches.length > 0) {
    return (Number(matches[1]) * totalSize) / 100;
  }
}

// exporting for tests
export function getSizeAsNumber(isWidth: boolean, size?: string | number) {
  if (size) {
    if (typeof size === 'number') {
      return size;
    } else {
      const result = getSizeFromPercentage(size, isWidth ? Constants.screenWidth : Constants.screenHeight);
      if (result) {
        return result;
      }
    }
  }
}

// exporting for tests
export function getSize(isWidth: boolean,
  defaultSize?: number,
  propSize?: string | number,
  style?: StyleProp<ViewStyle>) {
  const size = getSizeAsNumber(isWidth, propSize);
  if (!isUndefined(size)) {
    return size;
  }

  if (style) {
    const flattenedStyle = StyleSheet.flatten(style);
    const size = getSizeAsNumber(isWidth, isWidth ? flattenedStyle.width : flattenedStyle.height);
    if (!isUndefined(size)) {
      return size;
    }
  }

  return defaultSize;
}

const useSizeStyle = (props: StyleProps) => {
  const {width: propsWidth, height: propsHeight, containerStyle} = props;

  const width = useMemo(() => {
    return getSize(true, 250, propsWidth, containerStyle);
  }, [propsWidth, containerStyle]);

  const height = useMemo(() => {
    return getSize(false, undefined, propsHeight, containerStyle);
  }, [propsHeight, containerStyle]);

  return {width, height};
};

export default useSizeStyle;
