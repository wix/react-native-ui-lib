import * as Animatable from 'react-native-animatable';
declare type AnimationType = {
    animation: Animatable.Animation;
    easing?: Animatable.Easing;
    duration: number;
    useNativeDriver?: boolean;
};
declare type AnimationPresets = {
    slideInUp: AnimationType;
    slideInDown: AnimationType;
    fadeIn: AnimationType;
    fadeOut: AnimationType;
    fadeInRight: AnimationType;
};
/**
 * @description: Animatable animations and presets
 * @extendsnotes: To have access to uilib's animations, and load your custom animations (optional), call:
 * 'Animatable.initializeRegistryWithDefinitions(AnimatableManager.loadAnimationDefinitions(<OPTIONAL_CUSTOM_ANIMATION>));'
 * in your app entry point
 */
export declare class AnimatableManager {
    presets: AnimationPresets;
    animations: any;
    constructor();
    loadAnimationPresets(animationPresets: Dictionary<any>): void;
    loadAnimationDefinitions(animationDefinitions: any): {
        itemEntrance: {
            from: {
                opacity: number;
                translateY: number;
            };
            to: {
                opacity: number;
                translateY: number;
            };
        };
        itemAddition: {
            from: {
                opacity: number;
                scale: number;
                translateY: number;
            };
            to: {
                opacity: number;
                scale: number;
                translateY: number;
            };
        };
        itemRemoval: {
            from: {
                opacity: number;
                scale: number;
                translateY: number;
            };
            to: {
                opacity: number;
                scale: number;
                translateY: number;
            };
        };
        listItemAddition: {
            from: {
                scaleY: number;
                translateY: number;
            };
            to: {
                scaleY: number;
                translateY: number;
            };
        };
    };
    loadSlideByHeightDefinitions(height: number, suffix: string): {
        itemEntrance: {
            from: {
                opacity: number;
                translateY: number;
            };
            to: {
                opacity: number;
                translateY: number;
            };
        };
        itemAddition: {
            from: {
                opacity: number;
                scale: number;
                translateY: number;
            };
            to: {
                opacity: number;
                scale: number;
                translateY: number;
            };
        };
        itemRemoval: {
            from: {
                opacity: number;
                scale: number;
                translateY: number;
            };
            to: {
                opacity: number;
                scale: number;
                translateY: number;
            };
        };
        listItemAddition: {
            from: {
                scaleY: number;
                translateY: number;
            };
            to: {
                scaleY: number;
                translateY: number;
            };
        };
    };
    /** Tools */
    getRandomDelay(delays: number[] | undefined, options: any): any;
    getEntranceByIndex: (index: number | undefined, options: any) => any;
    getZoomInSlideDown(index: number | undefined, options: any, zoomIndex?: number): any;
    getSlideInSlideDown(index: number | undefined, options: any, zoomIndex?: number): any;
}
declare const _default: AnimatableManager;
export default _default;
