import { PureComponent } from 'react';
declare class KeyboardTrackingView extends PureComponent {
    static displayName: string;
    render(): JSX.Element;
    getNativeProps(): Promise<{
        trackingViewHeight: number;
        keyboardHeight: number;
        contentTopInset: number;
    }>;
    scrollToStart(): void;
}
export default KeyboardTrackingView;
