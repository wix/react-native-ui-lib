import { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
export declare enum PanningDirections {
    UP = "up",
    DOWN = "down",
    LEFT = "left",
    RIGHT = "right"
}
export declare enum TranslationLock {
    /**
     * No locking (default).
     */
    NONE = "none",
    /**
     * Will lock the start location to the drop location.
     * Only when a certain direction is not allowed.
     * Only when dismissible={false}
     */
    DROP = "drop",
    /**
     * Will lock the start location to the dragged location.
     * Only when a certain direction is not allowed.
     * Only when dismissible={false}
     */
    DRAG = "drag"
}
export interface Frame {
    x: number;
    y: number;
}
export interface TranslationOptions {
    directionLock?: boolean;
    translationLock: TranslationLock;
    currentTranslation: Frame;
}
export interface PanDismissThreshold {
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
export declare function getTranslationClamp(initialTranslation: Frame, options: TranslationOptions): Frame;
export declare function getTranslationDirectionClamp(translation: Frame, options: TranslationOptions): Frame;
export declare function getTranslation(event: PanGestureHandlerEventPayload, initialTranslation: Frame, directions: PanningDirections[], options: TranslationOptions): Frame;
export declare const DEFAULT_THRESHOLD: Required<PanDismissThreshold>;
/**
 * Will return undefined if should not dismiss
 */
export declare function getDismissVelocity(event: PanGestureHandlerEventPayload, directions: PanningDirections[], options: TranslationOptions, threshold?: PanDismissThreshold): Partial<Frame> | undefined;
