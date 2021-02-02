import { LayoutChangeEvent } from 'react-native';
export declare type ScrollEnablerProps = {
    /**
     * Whether the scroll is horizontal (default is false).
     */
    horizontal?: boolean;
};
export declare type ScrollEnablerResultProps = {
    /**
     * onContentSizeChange callback (should be set to your onContentSizeChange).
     */
    onContentSizeChange: (contentWidth: number, contentHeight: number) => void;
    /**
     * onLayout callback (should be set to your onLayout).
     */
    onLayout: (event: LayoutChangeEvent) => void;
    /**
     * Whether the scroll should be enabled (should be set to your scrollEnabled).
     */
    scrollEnabled: boolean;
};
declare const useScrollEnabler: (props?: ScrollEnablerProps) => ScrollEnablerResultProps;
export default useScrollEnabler;
