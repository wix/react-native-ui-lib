import { ImageStyle, TextStyle } from 'react-native';
import { TextPropTypes } from '../text';
import { TypographyModifiers, ColorsModifiers, BackgroundColorModifier, MarginModifiers } from '../../commons/new';
export declare type ButtonPropTypes = TextPropTypes & TypographyModifiers & ColorsModifiers & BackgroundColorModifier & MarginModifiers & {
    /**
     * Text to show inside the button
     */
    label?: string;
    /**
     * The Button text color (inherited from Text component)
     */
    color?: string;
    /**
     * Icon image source
     */
    iconSource?: object | number | Function;
    /**
     * Icon image style
     */
    iconStyle?: ImageStyle;
    /**
     * Should the icon be right to the label
     */
    iconOnRight?: boolean;
    /**
     * Color of the button background
     */
    backgroundColor?: string;
    /**
     * Size of the button [large, medium, small, xSmall]
     */
    size?: 'xSmall' | 'small' | 'medium' | 'large';
    /**
     * Custom border radius.
     */
    borderRadius?: number;
    /**
     * Actions handler
     */
    onPress?: Function;
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
    labelStyle?: TextStyle;
    /**
     * Props that will be passed to the button's Text label.
     */
    labelProps?: object;
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
    getActiveBackgroundColor?: Function;
    /**
     * should animate layout change
     * Note?: For Android you must set 'setLayoutAnimationEnabledExperimental(true)' via RN's 'UIManager'
     */
    animateLayout?: boolean;
    /**
     * the direction of the animation ('left' and 'right' will effect the button's own alignment)
     */
    animateTo?: 'center' | 'left' | 'right';
};
export declare type ButtonState = {
    size?: number;
    borderRadius?: number;
    isLandscape?: boolean;
};
