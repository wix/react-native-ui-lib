import {type StyleProp, type ViewStyle, StyleSheet} from 'react-native';

interface UnpackStyleOptions {
  flatten?: boolean;
}

export function unpackStyle(style?: StyleProp<ViewStyle>, options: UnpackStyleOptions = {}) {
  if (style) {
    return JSON.parse(JSON.stringify(options.flatten ? StyleSheet.flatten(style) : style));
  }
}
