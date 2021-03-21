import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { PanningDirections } from '../panningViews/panningProvider';
interface DialogDismissibleProps {
    /**
     * Additional styling
     */
    style?: StyleProp<ViewStyle>;
    /**
     * The direction of the allowed pan (default is DOWN)
     * Types: UP, DOWN, LEFT and RIGHT (using PanningProvider.Directions.###)
     */
    direction?: PanningDirections;
    /**
     * onDismiss callback
     */
    onDismiss?: () => void;
    /**
     * The dialog`s container style
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Whether to show the dialog or not
     */
    visible?: boolean;
}
interface Props extends DialogDismissibleProps {
    children?: React.ReactNode | React.ReactNode[];
}
declare const DialogDismissibleView: {
    (props: Props): JSX.Element;
    displayName: string;
    defaultProps: {
        direction: PanningDirections;
        onDismiss: () => void;
    };
};
export default DialogDismissibleView;
