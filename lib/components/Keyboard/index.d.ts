/// <reference types="react" />
import { KeyboardTrackingViewProps } from './KeyboardTracking/KeyboardTrackingView';
import KeyboardRegistry from './KeyboardInput/KeyboardRegistry';
import KeyboardAccessoryView, { KeyboardAccessoryViewProps } from './KeyboardInput/KeyboardAccessoryView';
import KeyboardUtils from './KeyboardInput/utils/KeyboardUtils';
export { KeyboardTrackingViewProps, KeyboardAccessoryViewProps };
declare const _default: {
    KeyboardTrackingView: import("react").ForwardRefExoticComponent<Omit<KeyboardTrackingViewProps, "ref"> & import("react").RefAttributes<unknown>> & {
        scrollBehaviors: {
            NONE: any;
            SCROLL_TO_BOTTOM_INVERTED_ONLY: any;
            FIXED_OFFSET: any;
        };
    };
    KeyboardAwareInsetsView: {
        (props: import("react-native/types").ViewProps & {
            trackInteractive?: boolean | undefined;
            revealKeyboardInteractive?: boolean | undefined;
            manageScrollView?: boolean | undefined;
            requiresSameParentToManageScrollView?: boolean | undefined;
            allowHitsOutsideBounds?: boolean | undefined;
            scrollToFocusedInput?: boolean | undefined;
            scrollBehavior?: number | undefined;
            addBottomView?: boolean | undefined;
            bottomViewColor?: string | undefined;
            useSafeArea?: boolean | undefined;
            usesBottomTabs?: boolean | undefined;
            ref?: any;
            style?: import("react-native/types").ViewStyle | undefined;
            children?: import("react").ReactChild | import("react").ReactChild[] | undefined;
        } & {
            offset?: number | undefined;
        }): import("react").JSX.Element;
        displayName: string;
    };
    KeyboardRegistry: typeof KeyboardRegistry;
    KeyboardAccessoryView: typeof KeyboardAccessoryView;
    KeyboardUtils: typeof KeyboardUtils;
};
export default _default;
