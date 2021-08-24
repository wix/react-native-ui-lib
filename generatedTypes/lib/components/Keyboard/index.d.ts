/// <reference types="react" />
import { KeyboardTrackingViewProps } from './KeyboardTracking/KeyboardTrackingView';
import KeyboardRegistry from './KeyboardInput/KeyboardRegistry';
import KeyboardAccessoryView, { KeyboardAccessoryViewProps } from './KeyboardInput/KeyboardAccessoryView';
import KeyboardUtils from './KeyboardInput/utils/KeyboardUtils';
export { KeyboardTrackingViewProps, KeyboardAccessoryViewProps };
declare const _default: {
    KeyboardTrackingView: ({ children, ...others }: KeyboardTrackingViewProps) => JSX.Element;
    KeyboardAwareInsetsView: {
        (props: KeyboardTrackingViewProps): JSX.Element;
        displayName: string;
    };
    KeyboardRegistry: typeof KeyboardRegistry;
    KeyboardAccessoryView: typeof KeyboardAccessoryView;
    KeyboardUtils: typeof KeyboardUtils;
};
export default _default;
