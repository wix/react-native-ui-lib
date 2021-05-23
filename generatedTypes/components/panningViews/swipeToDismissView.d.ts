/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
import { PanDismissibleViewProps } from './panDismissibleView';
import { PanListenerViewProps } from './panListenerView';
import { PanningDirections } from './panningProvider';
export interface SwipeToDismissViewProps extends Pick<PanDismissibleViewProps, 'onDismiss' | 'threshold'>, Pick<PanListenerViewProps, 'isClickable'> {
    /**
     * The content to be rendered inside the dismissible view
     */
    renderContent: (props: any) => JSX.Element;
    /**
     * The directions of the allowed pan.
     * Types: UP, DOWN, LEFT and RIGHT (using PanningDirections).
     */
    panDirections: PanningDirections[];
    /**
     * Additional styling
     */
    style?: StyleProp<ViewStyle>;
}
/**
 * @description: SwipeToDismissView component allows for easy swipe to dismiss
 */
declare function SwipeToDismissView(props: SwipeToDismissViewProps): JSX.Element;
declare namespace SwipeToDismissView {
    var displayName: string;
}
export default SwipeToDismissView;
