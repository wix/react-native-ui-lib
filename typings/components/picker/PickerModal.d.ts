/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type PickerModalProps = {
    topBarProps?: any;
    scrollPosition?: number;
    showSearch?: boolean;
    searchStyle?: {
        color?: string;
        placeholderTextColor?: string;
        selectionColor?: string;
    };
    searchPlaceholder?: string;
    onSearchChange?: (...args: any[]) => any;
};
declare type PickerModalState = {
    scrollHeight: undefined;
    scrollContentHeight: undefined;
};
declare class PickerModal extends BaseComponent<PickerModalProps, PickerModalState> {
    static displayName: string;
    static defaultProps: {
        searchPlaceholder: string;
        searchStyle: {};
    };
    state: {
        scrollHeight: any;
        scrollContentHeight: any;
    };
    generateStyles(): void;
    componentWillReceiveProps(nextProps: any): void;
    onScrollViewLayout: ({ nativeEvent: { layout: { height } } }: {
        nativeEvent: {
            layout: {
                height: any;
            };
        };
    }) => void;
    onScrollViewContentSizeChange: (contentWidth: any, contentHeight: any) => void;
    scrollToSelected(scrollPosition?: any): void;
    renderSearchInput(): JSX.Element;
    render(): JSX.Element;
}
export default PickerModal;
