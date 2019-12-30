
import {ReactElement} from 'react';
import {
  GestureResponderEvent,
  ImageErrorEventData,
  ImageSourcePropType,
  ImageStyle,
  NativeSyntheticEvent,
  StyleProp,
  TextStyle,
  ViewStyle
} from 'react-native';
import {PureBaseComponent} from '../commons';
import {ColorValue} from '../style/colors';
import {ImageProps} from './Image';
import {BadgeProps} from './Badge';

export type AvatarBadgePosition = 'TOP_RIGHT' | 'TOP_LEFT' | 'BOTTOM_RIGHT' | 'BOTTOM_LEFT';

export interface AvatarProps {
  animate?: boolean;
  backgroundColor?: ColorValue;
  badgePosition?: AvatarBadgePosition;
  badgeProps?: BadgeProps;
  containerStyle?: StyleProp<ViewStyle>;
  imageSource?: ImageSourcePropType;
  imageProps?: ImageProps;
  imageStyle?: StyleProp<ImageStyle>;
  onImageLoadStart?: () => void;
  onImageLoadEnd?: () => void;
  onImageLoadError?: (error: NativeSyntheticEvent<ImageErrorEventData>) => void;
  label?: string;
  labelColor?: ColorValue;
  ribbonLabel?: string;
  ribbonStyle?: StyleProp<ViewStyle>;
  ribbonLabelStyle?: StyleProp<TextStyle>;
  customRibbon?: ReactElement;
  size?: number;
  onPress?: (event: GestureResponderEvent) => void;
}

export class Avatar extends PureBaseComponent<AvatarProps> {}
