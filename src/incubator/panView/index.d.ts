import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ViewProps } from '../../components/view';
import { PanningDirections, PanningDirectionsEnum } from './panningUtil';
import { PanGestureProps, PanViewDirections, PanViewDirectionsEnum, PanViewDismissThreshold, DEFAULT_DIRECTIONS, DEFAULT_ANIMATION_CONFIG } from './usePanGesture';
export { PanningDirections, PanningDirectionsEnum, PanViewDirections, PanViewDirectionsEnum, PanViewDismissThreshold, DEFAULT_DIRECTIONS, DEFAULT_ANIMATION_CONFIG };
export interface PanViewProps extends Omit<PanGestureProps, 'hiddenLocation'>, ViewProps {
    /**
     * Add a style to the container
     */
    containerStyle?: StyleProp<ViewStyle>;
}
interface Props extends PanViewProps {
    children?: React.ReactNode | React.ReactNode[];
}
declare const _default: React.ForwardRefExoticComponent<PanViewProps & React.RefAttributes<any>> & {
    (props: Props): React.JSX.Element;
    displayName: string;
    directions: typeof PanningDirectionsEnum;
};
export default _default;
