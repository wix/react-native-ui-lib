import { PanningDirections, PanningDirectionsEnum, PanningDismissThreshold } from './panningUtil';
import type { HiddenLocation } from '../hooks/useHiddenLocation';
export type PanViewDirections = PanningDirections;
export declare const PanViewDirectionsEnum: typeof PanningDirectionsEnum;
export type PanViewDismissThreshold = PanningDismissThreshold;
export declare const DEFAULT_DIRECTIONS: PanningDirectionsEnum[];
export interface PanGestureProps {
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
    hiddenLocation: HiddenLocation;
}
export declare const DEFAULT_ANIMATION_CONFIG: {
    velocity: number;
    damping: number;
    stiffness: number;
    mass: number;
};
declare const usePanGesture: (props: PanGestureProps) => {
    translation: {
        x: import("react-native-reanimated").SharedValue<number>;
        y: import("react-native-reanimated").SharedValue<number>;
    };
    gesture: import("react-native-gesture-handler/lib/typescript/handlers/gestures/panGesture").PanGesture;
    reset: () => void;
};
export default usePanGesture;
