import {ImageStyle, TextStyle, StyleProp} from 'react-native';
import {
  BaseComponentInjectedProps,
  ForwardRefInjectedProps,
  TypographyModifiers,
  ColorsModifiers,
  BackgroundColorModifier,
  MarginModifiers
} from '../../commons/new';
import {TouchableOpacityProps} from '../touchableOpacity';
import {TextProps} from '../text';
import {ImageProps} from '../image';
import type {IconProps} from '../icon';

export enum ButtonSize {
  xSmall = 'xSmall',
  small = 'small',
  medium = 'medium',
  large = 'large'
}

export type ButtonSizeProp = ButtonSize | `${ButtonSize}`;

export enum ButtonAnimationDirection {
  center = 'center',
  left = 'left',
  right = 'right'
}

export type ButtonAnimationDirectionProp = ButtonAnimationDirection | `${ButtonAnimationDirection}`;

export type ButtonProps = TouchableOpacityProps &
  TypographyModifiers &
  ColorsModifiers &
  BackgroundColorModifier &
  MarginModifiers & {
    /**
     * Text to show inside the button
     */
    label?: string;
    /**
     * The Button text color (inherited from Text component)
     */
    color?: string;
    /**
     * Icon image source or a callback function that returns a source
     * TODO: Deprecate icon source as function
     */
    iconSource?: ImageProps['source'] | null | ((iconStyle?: StyleProp<ImageStyle>[]) => JSX.Element);
    /**
     * Icon image style
     */
    iconStyle?: StyleProp<ImageStyle>;
    /**
     * Other image props that will be passed to the image
     */
    iconProps?: Partial<IconProps>;
    /**
     * Should the icon be right to the label
     */
    iconOnRight?: boolean;
    /**
     * whether the icon should flip horizontally on RTL locals
     */
    supportRTL?: boolean;
    /**
     * Color of the button background
     */
    backgroundColor?: string;
    /**
     * Color of the disabled button background
     */
    disabledBackgroundColor?: string;
    /**
     * Size of the button [large, medium, small, xSmall]
     */
    size?: ButtonSizeProp;
    /**
     * Custom border radius.
     */
    borderRadius?: number;
    /**
     * Actions handler
     */
    onPress?: (props: any) => void;
    /**
     * Disable interactions for the component
     */
    disabled?: boolean;
    /**
     * Button will have outline style
     */
    outline?: boolean;
    /**
     * The outline color
     */
    outlineColor?: string;
    /**
     * The outline width
     */
    outlineWidth?: number;
    /**
     * Button will look like a link
     */
    link?: boolean;
    /**
     * Button will look like a hyperlink
     */
    hyperlink?: boolean;
    /**
     * label color for when it's displayed as link or hyperlink
     */
    linkColor?: string;
    /**
     * Additional styles for label text
     */
    labelStyle?: StyleProp<TextStyle>;
    /**
     * Props that will be passed to the button's Text label.
     */
    labelProps?: TextProps;
    /**
     * should the button act as a coast to coast button (no border radius)
     */
    fullWidth?: boolean;
    /**
     * should the button be a round button
     */
    round?: boolean;
    /**
     * Control shadow visibility
     */
    enableShadow?: boolean;
    /**
     * avoid inner button padding
     */
    avoidInnerPadding?: boolean;
    /**
     * avoid minimum width constraints
     */
    avoidMinWidth?: boolean;
    /**
     * callback for getting activeBackgroundColor (e.g. (calculatedBackgroundColor, prop) => {...})
     * better set using ThemeManager
     */
    getActiveBackgroundColor?: (backgroundColor: string, props: any) => string;
    /**
     * should animate layout change
     * Note?: For Android you must set 'setLayoutAnimationEnabledExperimental(true)' via RN's 'UIManager'
     */
    animateLayout?: boolean;
    /**
     * the direction of the animation ('left' and 'right' will effect the button's own alignment)
     */
    animateTo?: ButtonAnimationDirectionProp;
  };

export type ButtonState = {
  size?: number;
  borderRadius?: number;
  isLandscape?: boolean;
};

export type Props = ButtonProps & BaseComponentInjectedProps & ForwardRefInjectedProps;

export const DEFAULT_PROPS = {
  iconOnRight: false
};
