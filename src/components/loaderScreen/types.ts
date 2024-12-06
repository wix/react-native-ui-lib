import {ActivityIndicatorProps, TextStyle, ViewStyle, ColorValue} from 'react-native';

export type LoaderScreenProps = ActivityIndicatorProps & {
  /**
   * Color of the loading indicator
   */
  loaderColor?: string;
  /**
   * Custom loader
   */
  customLoader?: React.ReactChild;
  /**
   * Color of the loader background (only when passing 'overlay')
   */
  backgroundColor?: ColorValue;
  /**
   * loader message
   */
  message?: string;
  /**
   * message style
   */
  messageStyle?: TextStyle;
  /**
   * Show the screen as an absolute overlay
   */
  overlay?: boolean;
  /**
   * Custom container style
   */
  containerStyle?: ViewStyle;
};
