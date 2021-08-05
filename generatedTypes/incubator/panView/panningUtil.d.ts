import { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
export declare enum PanViewDirections {
    UP = "up",
    DOWN = "down",
    LEFT = "left",
    RIGHT = "right"
}
export interface Frame {
    x: number;
    y: number;
}
export interface TranslationOptions {
    directionLock?: boolean;
    currentTranslation: Frame;
}
export interface PanViewDismissThreshold {
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
export declare function getTranslationDirectionClamp(translation: Frame, options: TranslationOptions): Frame;
export declare function getTranslation(event: PanGestureHandlerEventPayload, initialTranslation: Frame, directions: PanViewDirections[], options: TranslationOptions): Frame;
export declare const DEFAULT_THRESHOLD: Required<PanViewDismissThreshold>;
/**
 * Will return undefined if should not dismiss
 */
export declare function getDismissVelocity(event: PanGestureHandlerEventPayload, directions: PanViewDirections[], options: TranslationOptions, threshold?: PanViewDismissThreshold): Partial<Frame> | undefined;
