import type {ReactElement} from 'react';
import type {
  GestureResponderEvent,
  ImageSourcePropType,
  ImageStyle,
  LayoutRectangle,
  StyleProp,
  TextStyle,
  ViewStyle
} from 'react-native';

export type PositionStyle = Pick<ViewStyle, 'top' | 'bottom' | 'left' | 'right'>;

export type LayoutStyle = PositionStyle & Pick<ViewStyle, 'alignItems'>;

export type PaddingsStyle = Pick<ViewStyle, 'paddingLeft' | 'paddingRight' | 'paddingVertical' | 'paddingHorizontal'>;

export type ContentType = string | ReactElement;

export enum TargetAlignments {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center'
}

export enum HintPositions {
  TOP = 'top',
  BOTTOM = 'bottom'
}

export interface HintProps {
  /**
   * Control the visibility of the hint
   */
  visible?: boolean;
  /**
   * The hint background color
   */
  color?: string;
  /**
   * The hint message
   */
  message?: ContentType | ContentType[];
  /**
   * The hint message custom style
   */
  messageStyle?: StyleProp<TextStyle>;
  /**
   * Icon to show next to the hint's message
   */
  icon?: ImageSourcePropType;
  /**
   * The icon's style
   */
  iconStyle?: StyleProp<ImageStyle>;
  /**
   * The hint's position
   */
  position?: HintPositions;
  /**
   * Provide custom target position instead of wrapping a child
   */
  targetFrame?: LayoutRectangle;
  /**
   * Open the hint using a Modal component
   */
  useModal?: boolean;
  /**
   * Show side tips instead of the middle tip
   */
  useSideTip?: boolean;
  /**
   * The hint's border radius
   */
  borderRadius?: number;
  /**
   * Hint margins from screen edges
   */
  edgeMargins?: number;
  /**
   * Hint offset from target
   */
  offset?: number;
  /**
   * Callback for Hint press
   */
  onPress?: () => void;
  /**
   * Callback for the background press
   */
  onBackgroundPress?: (event: GestureResponderEvent) => void;
  /**
   * Color for background overlay (require onBackgroundPress)
   */
  backdropColor?: string;
  /**
   * The hint container width
   */
  containerWidth?: number;
  /**
   * Custom content element to render inside the hint container
   */
  customContent?: JSX.Element;
  /**
   * Remove all hint's paddings
   */
  removePaddings?: boolean;
  /**
   * Enable shadow (for hint with white background only)
   */
  enableShadow?: boolean;
  /**
   * The hint's test identifier
   */
  testID?: string;
  /**
   * Additional styling
   */
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}
