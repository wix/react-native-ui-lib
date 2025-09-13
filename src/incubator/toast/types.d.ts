import { ReactElement, ReactNode } from 'react';
import { ImageSourcePropType, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ButtonProps } from '../../components/button';
import { TextProps } from '../../components/text';
export declare enum ToastPresets {
    GENERAL = "general",
    SUCCESS = "success",
    FAILURE = "failure",
    OFFLINE = "offline"
}
export interface ToastProps {
    /**
     * Whether to show or hide the toast
     */
    visible?: boolean;
    /**
     * The position of the toast. 'top' or 'bottom'.
     */
    position?: 'top' | 'bottom';
    /**
     * Toast message
     */
    message?: string;
    /**
     * Toast message style
     */
    messageStyle?: StyleProp<TextStyle>;
    /**
     * Toast message props
     */
    messageProps?: TextProps;
    /**
     * should message be centered in the toast
     */
    centerMessage?: boolean;
    /**
     * custom zIndex for toast
     */
    zIndex?: number;
    /**
     * Custom elevation for Android
     */
    elevation?: number;
    /**
     * a single action for the user (loader will override this)
     */
    action?: ButtonProps;
    /**
     * should show a loader
     */
    showLoader?: boolean;
    /**
     * should show a loader
     */
    loaderElement?: ReactElement;
    /**
     * callback for dismiss action
     */
    onDismiss?: () => void;
    /**
     * whether to make the toast swipeable
     * require to pass onDismiss method to control visibility
     */
    swipeable?: boolean;
    /**
     * number of milliseconds to automatically invoke the onDismiss callback
     */
    autoDismiss?: number;
    /**
     * callback for end of component animation
     */
    onAnimationEnd?: (visible?: boolean) => void;
    /**
     * render a custom view that will appear permanently above or below a Toast,
     * depends on the Toast's position, and animate with it when the Toast is made visible or dismissed
     */
    renderAttachment?: () => JSX.Element | undefined;
    /**
     * The preset look for GENERAL, SUCCESS and FAILURE (Toast.presets.xxx)
     */
    preset?: ToastPresets | `${ToastPresets}`;
    /**
     * Whether to trigger an haptic feedback once the toast is shown (requires react-native-haptic-feedback dependency)
     */
    enableHapticFeedback?: boolean;
    /**
     * Test Id for component
     */
    testID?: string;
    /**
     * Toast style
     */
    style?: StyleProp<ViewStyle>;
    /**
     * Toast container style
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * a left icon
     */
    icon?: ImageSourcePropType;
    /**
     * icon tint color
     */
    iconColor?: string;
    /**
     * The background color of the toast
     */
    backgroundColor?: string;
    children?: ReactNode;
}
