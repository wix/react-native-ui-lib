import React, { PureComponent } from 'react';
declare class KeyboardTrackingView extends PureComponent {
    static displayName: string;
    render(): React.JSX.Element;
    getNativeProps(): Promise<{
        trackingViewHeight: number;
        keyboardHeight: number;
        contentTopInset: number;
    }>;
    scrollToStart(): void;
}
export default KeyboardTrackingView;
