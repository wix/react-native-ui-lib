import React, { Component } from 'react';
import ListItemPart from './ListItemPart';
import { ListItemProps } from './types';
type ListItemState = {
    pressed: boolean;
};
/**
 * @description: List item component to render inside a List component
 * @extends: TouchableOpacity
 * @gif: https://media.giphy.com/media/l1IBjHowyPcOTWAY8/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/BasicListScreen.tsx
 */
declare class ListItem extends Component<ListItemProps, ListItemState> {
    static displayName: string;
    static defaultProps: {
        height: number;
        containerElement: React.ForwardRefExoticComponent<import("../../components/touchableOpacity").TouchableOpacityProps & React.RefAttributes<any>>;
        underlayColor: string;
    };
    static Part: typeof ListItemPart;
    styles: {
        container: {
            backgroundColor: string;
        };
        innerContainer: {
            flexDirection: "row";
            height: import("react-native").DimensionValue | undefined;
        };
    };
    constructor(props: ListItemProps);
    onHideUnderlay(): void;
    onShowUnderlay(): void;
    setPressed(isPressed: boolean): void;
    renderViewContainer: () => React.JSX.Element;
    renderCustomContainer: (Container: React.ComponentType) => React.JSX.Element;
    renderChildren: () => React.JSX.Element;
    render(): React.JSX.Element;
}
export { ListItemProps };
declare const _default: React.ForwardRefExoticComponent<import("../../components/touchableOpacity").TouchableOpacityProps & {
    height?: import("react-native").DimensionValue | undefined;
    onPress?: (() => void) | undefined;
    onLongPress?: (() => void) | undefined;
    containerStyle?: import("react-native").ViewStyle | undefined;
    containerElement?: React.ComponentType<import("../../components/touchableOpacity").TouchableOpacityProps | ListItemProps> | undefined;
    style?: import("react-native").ViewStyle | undefined;
    underlayColor?: string | undefined;
    testID?: string | undefined;
} & {
    children?: React.ReactNode;
} & React.RefAttributes<any>> & typeof ListItem;
export default _default;
