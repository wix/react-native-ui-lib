import { ImageStyle, TextStyle, StyleProp } from 'react-native';
import { BaseComponentInjectedProps, ForwardRefInjectedProps, TypographyModifiers, ColorsModifiers, BackgroundColorModifier, MarginModifiers } from '../../commons/new';
import { TouchableOpacityProps } from '../touchableOpacity';
import { TextProps } from '../text';
export declare enum ButtonSize {
    xSmall = "xSmall",
    small = "small",
    medium = "medium",
    large = "large"
}
export declare enum ButtonAnimationDirection {
    center = "center",
    left = "left",
    right = "right"
}
export declare type ButtonProps = TouchableOpacityProps & TypographyModifiers & ColorsModifiers & BackgroundColorModifier & MarginModifiers & {
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
     */
    iconSource?: object | number | Function;
    /**
     * Icon image style
     */
    iconStyle?: StyleProp<ImageStyle>;
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
    size?: ButtonSize;
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
     * label color for when it's displayed as link
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
     * Control shadow visibility (iOS-only)
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
    animateTo?: ButtonAnimationDirection;
};
export declare type ButtonPropTypes = ButtonProps;
export declare type ButtonState = {
    size?: number;
    borderRadius?: number;
    isLandscape?: boolean;
};
export declare type Props = ButtonProps & BaseComponentInjectedProps & ForwardRefInjectedProps;
export declare const DEFAULT_PROPS: {
    iconOnRight: boolean;
};
