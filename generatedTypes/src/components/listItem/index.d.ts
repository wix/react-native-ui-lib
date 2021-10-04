import React, { Component } from 'react';
import ListItemPart from './ListItemPart';
import { ListItemProps } from './types';
declare type ListItemState = {
    pressed: boolean;
};
declare class ListItem extends Component<ListItemProps, ListItemState> {
    static displayName: string;
    static defaultProps: {
        height: number;
        containerElement: React.ComponentClass<import("../../components/touchableOpacity").TouchableOpacityProps & {
            useCustomTheme?: boolean | undefined;
        }, any>;
        underlayColor: string;
    };
    static Part: typeof ListItemPart;
    styles: {
        container: {
            backgroundColor: string;
        };
        innerContainer: {
            flexDirection: "row";
            height: string | number | undefined;
        };
    };
    constructor(props: ListItemProps);
    onHideUnderlay(): void;
    onShowUnderlay(): void;
    setPressed(isPressed: boolean): void;
    renderViewContainer: () => JSX.Element;
    renderCustomContainer: (Container: React.ComponentType) => JSX.Element;
    renderChildren: () => JSX.Element;
    render(): JSX.Element;
}
export { ListItemProps };
declare const _default: React.ComponentClass<ListItemProps & {
    useCustomTheme?: boolean | undefined;
}, any> & typeof ListItem;
export default _default;
