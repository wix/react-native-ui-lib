import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { DialogProps } from '../dialog';
import { ButtonProps } from '../button';
declare type ActionSheetOnOptionPress = (index: number) => void;
declare type ActionSheetProps = {
    /**
     * Whether to show the action sheet or not
     */
    visible: boolean;
    /**
     * Title of the action sheet. Note: if both title and message are not passed will not render the title view at all
     */
    title?: string;
    /**
     * Message of the action sheet
     */
    message?: string;
    /**
     * Index of the option represents the cancel action (to be displayed as the separated bottom bold button)
     */
    cancelButtonIndex?: number;
    /**
     * Index of the option represents the destructive action (will display red text. Usually used for 'delete' or
     * 'abort' actions)
     */
    destructiveButtonIndex?: number;
    /**
     * List of options for the action sheet, follows the Button prop types (supply 'label' string and 'onPress'
     * function)
     */
    options?: Array<ButtonProps>;
    /**
     * callback for when dismissing the action sheet, usually used for setting visible prop to false
     */
    onDismiss?: DialogProps['onDismiss'];
    /**
     * Should use the native action sheet for iOS
     */
    useNativeIOS?: boolean;
    /**
     * When passed (only with useNativeIOS), will display a cancel button at the bottom (overrides cancelButtonIndex)
     */
    showCancelButton?: boolean;
    /**
     * Add or override style of the action sheet (wraps the title and actions)
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Add or override style of the dialog wrapping the action sheet
     */
    dialogStyle?: StyleProp<ViewStyle>;
    /**
     * Add or override style of the options list
     */
    optionsStyle?: StyleProp<ViewStyle>;
    /**
     * Render custom title
     */
    renderTitle?: () => JSX.Element;
    /**
     * Render custom action
     * Note: you will need to call onOptionPress so the option's onPress will be called
     */
    renderAction?: (option: ButtonProps, index: number, onOptionPress: ActionSheetOnOptionPress) => JSX.Element;
    /**
     * Called once the modal has been dismissed (iOS only, modal only)
     */
    onModalDismissed?: DialogProps['onModalDismissed'];
    /**
     * Whether or not to handle SafeArea
     */
    useSafeArea?: boolean;
    /**
     * testID for e2e tests
     */
    testID?: string;
};
declare const _default: React.ComponentClass<ActionSheetProps & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
