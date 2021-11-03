import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ViewProps } from '../../components/view';
import { PanningDirections, PanningDirectionsEnum, PanningDismissThreshold } from './panningUtil';
declare type PanViewDirections = PanningDirections;
declare const PanViewDirectionsEnum: typeof PanningDirectionsEnum;
declare type PanViewDismissThreshold = PanningDismissThreshold;
export { PanningDirections, PanningDirectionsEnum, PanViewDirections, PanViewDirectionsEnum, PanViewDismissThreshold };
export interface PanViewProps extends ViewProps {
    /**
     * The directions of the allowed pan (default is all)
     * Types: UP, DOWN, LEFT and RIGHT (using PanView.directions.###)
     */
    directions?: PanViewDirections[];
    /**
     * Dismiss the view if over the threshold (translation or velocity).
     */
    dismissible?: boolean;
    /**
     * Animate to start if not dismissed.
     */
    animateToOrigin?: boolean;
    /**
     * Callback to the dismiss animation end
     */
    onDismiss?: () => void;
    /**
     * Should the direction of dragging be locked once a drag has started.
     */
    directionLock?: boolean;
    /**
     * Object to adjust the dismiss threshold limits (eg {x, y, velocity}).
     */
    threshold?: PanViewDismissThreshold;
    /**
     * Add a style to the container
     */
    containerStyle?: StyleProp<ViewStyle>;
}
interface Props extends PanViewProps {
    children?: React.ReactNode | React.ReactNode[];
}
declare const _default: React.ComponentClass<PanViewProps & {
    useCustomTheme?: boolean | undefined;
}, any> & {
    (props: Props): JSX.Element;
    displayName: string;
    directions: typeof PanningDirectionsEnum;
    defaultProps: {
        threshold: Required<PanningDismissThreshold>;
    };
};
export default _default;
