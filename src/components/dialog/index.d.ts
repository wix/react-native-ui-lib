import React, { Component } from 'react';
import { StyleProp, ViewStyle, ModalPropsIOS, AccessibilityProps, type DimensionValue } from 'react-native';
import { AlignmentModifiers } from '../../commons/modifiers';
import { ModalProps } from '../modal';
import { PanningDirections, PanningDirectionsEnum } from '../panningViews/panningProvider';
export { PanningDirections as DialogDirections, PanningDirectionsEnum as DialogDirectionsEnum };
interface RNPartialProps extends Pick<ModalPropsIOS, 'supportedOrientations'>, Pick<AccessibilityProps, 'accessibilityLabel'> {
}
export interface DialogProps extends AlignmentModifiers, RNPartialProps {
    /**
     * Control visibility of the dialog
     */
    visible?: boolean;
    /**
     * Dismiss callback for when clicking on the background
     */
    onDismiss?: (props?: any) => void;
    /**
     * Whether or not to ignore background press
     */
    ignoreBackgroundPress?: boolean;
    /**
     * The color of the overlay background
     */
    overlayBackgroundColor?: string;
    /**
     * The dialog width (default: 90%)
     */
    width?: DimensionValue;
    /**
     * The dialog height (default: undefined)
     */
    height?: DimensionValue;
    /**
     * The direction of the allowed pan (default is DOWN).
     * Types: UP, DOWN, LEFT and RIGHT (using PanningProvider.Directions.###).
     * Pass null to remove pan.
     */
    panDirection?: PanningDirections;
    /**
     * Whether or not to handle SafeArea
     */
    useSafeArea?: boolean;
    /**
     * Called once the dialog has been dismissed completely
     */
    onDialogDismissed?: (props: any) => void;
    /**
     * If this is added only the header will be pannable;
     * this allows for scrollable content (the children of the dialog)
     * props are transferred to the renderPannableHeader
     */
    renderPannableHeader?: (props: any) => JSX.Element;
    /**
     * The props that will be passed to the pannable header
     */
    pannableHeaderProps?: any;
    /**
     * Additional props for the modal.
     */
    modalProps?: ModalProps;
    /**
     * The Dialog`s container style
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Used as a testing identifier
     */
    testID?: string;
    children?: React.ReactNode;
}
interface DialogState {
    alignments: AlignmentModifiers;
    modalVisibility?: boolean;
    dialogVisibility?: boolean;
    fadeOut?: boolean;
}
/**
 * @description: Dialog component for displaying custom content inside a popup dialog
 * @notes: Use alignment modifiers to control the dialog position
 * (top, bottom, centerV, centerH, etc... by default the dialog is aligned to center)
 * @modifiers: alignment
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/DialogScreen.js
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Dialog/Dialog.gif?raw=true
 */
declare class Dialog extends Component<DialogProps, DialogState> {
    static displayName: string;
    static directions: typeof PanningDirectionsEnum;
    static defaultProps: {
        overlayBackgroundColor: string | undefined;
    };
    private styles;
    constructor(props: DialogProps);
    UNSAFE_componentWillReceiveProps(nextProps: DialogProps): void;
    setAlignment(): void;
    onFadeDone: () => void;
    _onDismiss: () => void;
    onDismiss: () => void;
    hideDialogView: () => void;
    renderPannableHeader: (directions: PanningDirections[]) => React.JSX.Element | undefined;
    getContainerType: () => React.ForwardRefExoticComponent<import("../view").ViewProps & React.RefAttributes<import("react-native").View>> | React.ComponentClass<import("../panningViews/panListenerView").PanListenerViewProps, any>;
    renderDialogView: () => React.JSX.Element;
    renderDialogContainer: () => React.JSX.Element;
    render: () => React.JSX.Element;
}
declare const _default: React.ForwardRefExoticComponent<DialogProps & React.RefAttributes<any>> & typeof Dialog;
export default _default;
