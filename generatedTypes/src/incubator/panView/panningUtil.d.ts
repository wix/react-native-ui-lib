import { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
export declare enum PanningDirectionsEnum {
    UP = "up",
    DOWN = "down",
    LEFT = "left",
    RIGHT = "right"
}
export declare type PanningDirectionsUnion = 'up' | 'down' | 'left' | 'right';
export declare type PanningDirections = PanningDirectionsEnum | PanningDirectionsUnion;
export interface PanningDismissThreshold {
    /**
     * The (positive) velocity of a drag\swipe past it the view will be dismissed.
     */
    velocity?: number;
    /**
     * The x translation from the start location past it the view will be dismissed.
     */
    x?: number;
    /**
     * The y translation from the start location past it the view will be dismissed.
     */
    y?: number;
}
export interface Frame {
    x: number;
    y: number;
}
export interface TranslationOptions {
    directionLock?: boolean;
    currentTranslation: Frame;
}
export declare function getTranslationDirectionClamp(translation: Frame, options: TranslationOptions): Frame;
export declare function getTranslation(event: PanGestureHandlerEventPayload, initialTranslation: Frame, directions: PanningDirections[], options: TranslationOptions): Frame;
export declare const DEFAULT_THRESHOLD: Required<PanningDismissThreshold>;
/**
 * Will return undefined if should not dismiss
 */
export declare function getDismissVelocity(event: PanGestureHandlerEventPayload, directions: PanningDirections[], options: TranslationOptions, threshold?: PanningDismissThreshold): Partial<Frame> | undefined;
