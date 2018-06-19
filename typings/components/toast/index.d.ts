/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type ToastProps = {
    visible?: boolean;
    position?: "relative" | "top" | "bottom";
    height?: number;
    backgroundColor?: string;
    color?: string;
    message?: string;
    messageStyle?: object | number | any[];
    actions?: any[];
    onDismiss?: (...args: any[]) => any;
    autoDismiss?: number;
    allowDismiss?: boolean;
    renderContent?: (...args: any[]) => any;
    centerMessage?: boolean;
    animated?: boolean;
    enableBlur?: boolean;
    blurOptions?: object;
    zIndex?: number;
};
declare type ToastState = ({
    animationConfig: {
        animation: any;
        duration: any;
        delay: any;
        useNativeDriver: any;
        onAnimationEnd: () => void;
    };
    contentAnimation: any;
} | {
    animationConfig: {};
    contentAnimation: {};
}) & {
    isVisible: any;
} & {
    isVisible: boolean;
    animationConfig: {
        animation: any;
        duration: any;
        delay: any;
        useNativeDriver: any;
        onAnimationEnd: () => void;
    };
    contentAnimation: any;
    duration: number;
    delay: number;
};
/**
 * @description Toast component for showing a feedback about a user action.
 * @extends: Animatable.View
 * @extendslink: https://github.com/oblador/react-native-animatable
 * @gif: https://media.giphy.com/media/3oFzm1pKqGXybiDUre/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ToastsScreen.js
 */
export default class Toast extends BaseComponent<ToastProps, ToastState> {
    static displayName: string;
    static defaultProps: {
        position: string;
        color: any;
        animated: boolean;
        zIndex: number;
    };
    state: any;
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    generateStyles(): void;
    getPositionStyle(): {
        [x: number]: number;
        position: string;
        left: number;
        right: number;
    } | {
        position: any;
    };
    getAnimation(shouldShow: any): {
        animation: any;
        duration: any;
        delay: any;
        useNativeDriver: any;
        onAnimationEnd: () => void;
    };
    getContentAnimation(shouldShow: any): any;
    getBlurOptions(): any;
    renderContent(): any;
    renderMessage(): JSX.Element;
    renderOneAction(): JSX.Element;
    renderTwoActions(): JSX.Element;
    renderDismissButton(): JSX.Element;
    render(): JSX.Element;
    shouldShowToast(): any;
    onAnimationEnd(): void;
    setDismissTimer(): void;
    onDismiss(): void;
}
export {};
