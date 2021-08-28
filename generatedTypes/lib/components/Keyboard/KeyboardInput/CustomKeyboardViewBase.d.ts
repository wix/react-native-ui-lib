import React, { Component } from 'react';
import { EventSubscription } from 'react-native';
export declare type CustomKeyboardViewBaseProps = {
    inputRef?: any;
    initialProps?: any;
    component?: string;
    onItemSelected?: (component?: string, args?: any) => void;
    onRequestShowKeyboard?: (keyboardId: string) => void;
    children?: React.ReactChild | React.ReactChild[];
};
export default class CustomKeyboardViewBase<T extends CustomKeyboardViewBaseProps> extends Component<T> {
    static defaultProps: {
        initialProps: {};
    };
    registeredRequestShowKeyboard: boolean;
    keyboardExpandedToggle: any;
    keyboardEventListeners: EventSubscription[];
    constructor(props: T);
    shouldComponentUpdate(nextProps: T): boolean;
    componentWillUnmount(): void;
    addOnItemSelectListener(onItemSelected: CustomKeyboardViewBaseProps['onItemSelected'], component: CustomKeyboardViewBaseProps['component']): void;
    componentDidUpdate(prevProps: T): void;
    registerListener(props: T, nextProps: T): void;
}
