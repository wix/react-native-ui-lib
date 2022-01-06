/// <reference types="react" />
import { KeyboardTrackingViewProps } from './KeyboardTracking/KeyboardTrackingView';
import KeyboardRegistry from './KeyboardInput/KeyboardRegistry';
import KeyboardAccessoryView, { KeyboardAccessoryViewProps } from './KeyboardInput/KeyboardAccessoryView';
import KeyboardUtils from './KeyboardInput/utils/KeyboardUtils';
export { KeyboardTrackingViewProps, KeyboardAccessoryViewProps };
declare const _default: {
    KeyboardTrackingView: import("react").ForwardRefExoticComponent<Pick<import("react-native").ViewProps & {
        trackInteractive?: boolean | undefined;
        useSafeArea?: boolean | undefined;
        scrollToFocusedInput?: boolean | undefined;
        scrollBehavior?: number | undefined;
        revealKeyboardInteractive?: boolean | undefined;
        manageScrollView?: boolean | undefined;
        requiresSameParentToManageScrollView?: boolean | undefined;
        addBottomView?: boolean | undefined;
        allowHitsOutsideBounds?: boolean | undefined;
        ref?: any;
        children?: import("react").ReactChild | import("react").ReactChild[] | undefined;
        style?: import("react-native").ViewStyle | undefined;
    }, keyof import("react-native").ViewProps | "useSafeArea" | "trackInteractive" | "scrollToFocusedInput" | "scrollBehavior" | "revealKeyboardInteractive" | "manageScrollView" | "requiresSameParentToManageScrollView" | "addBottomView" | "allowHitsOutsideBounds"> & import("react").RefAttributes<unknown>>;
    KeyboardAwareInsetsView: {
        (props: KeyboardTrackingViewProps): JSX.Element;
        displayName: string;
    };
    KeyboardRegistry: typeof KeyboardRegistry;
    KeyboardAccessoryView: typeof KeyboardAccessoryView;
    KeyboardUtils: typeof KeyboardUtils;
};
export default _default;
