import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
export declare type ScrollEnablerProps = {
    /**
     * Whether the scroll is horizontal (default is false).
     */
    horizontal?: boolean;
    /**
     * Allows to be notified prior to actually reaching the start \ end of the scroll (by the threshold).
     * Should be a positive value.
     */
    threshold?: number;
};
export declare type ScrollEnablerResultProps = {
    /**
     * onScroll callback (should be set to your onScroll).
     */
    onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    /**
     * Is the scroll at the start (or equal\smaller than the threshold if one was given)
     */
    isScrollAtStart?: boolean;
    /**
     * Is the scroll at the end (or equal\greater than the threshold if one was given)
     */
    isScrollAtEnd?: boolean;
};
declare const useScrollReached: (props?: ScrollEnablerProps) => ScrollEnablerResultProps;
export default useScrollReached;
