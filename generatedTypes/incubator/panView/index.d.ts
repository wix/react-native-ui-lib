import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ViewProps } from '../../components/view';
import { PanViewDirections, PanViewDismissThreshold } from './panningUtil';
export { PanViewDirections, PanViewDismissThreshold };
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
    springBack?: boolean;
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
    directions: typeof PanViewDirections;
    defaultProps: {
        threshold: Required<PanViewDismissThreshold>;
    };
};
export default _default;
