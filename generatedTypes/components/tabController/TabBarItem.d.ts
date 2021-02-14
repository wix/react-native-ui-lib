import { PureComponent } from 'react';
import { /* processColor, */ TextStyle, LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';
import _ from 'lodash';
import Reanimated from 'react-native-reanimated';
import { State } from 'react-native-gesture-handler';
import { BadgeProps } from '../../components/badge';
export interface TabControllerItemProps {
    /**
     * label of the tab
     */
    label?: string;
    /**
     * custom label style
     */
    labelStyle?: TextStyle;
    /**
     * custom selected label style
     */
    selectedLabelStyle?: TextStyle;
    /**
     * the default label color
     */
    labelColor?: string;
    /**
     * the selected label color
     */
    selectedLabelColor?: string;
    /**
     * icon of the tab
     */
    icon?: number;
    /**
     * icon tint color
     */
    iconColor?: string;
    /**
     * icon selected tint color
     */
    selectedIconColor?: string;
    /**
     * Badge component props to display next the item label
     */
    badge?: BadgeProps;
    /**
     * maximun number of lines the label can break
     */
    /**
     * whether the tab will have a divider on its right
     */
    /**
     * A fixed width for the item
     */
    width?: number;
    /**
     * ignore of the tab
     */
    ignore?: boolean;
    /**
     * callback for when pressing a tab
     */
    onPress?: (index: number) => void;
    /**
     * whether to change the text to uppercase
     */
    uppercase?: boolean;
    /**
     * The active opacity when pressing a tab
     */
    activeOpacity?: number;
    /**
     * TODO: rename to feedbackColor
     * Apply background color on press for TouchableOpacity
     */
    activeBackgroundColor?: string;
    /**
     * Pass custom style
     */
    style?: StyleProp<ViewStyle>;
    /**
     * Used as a testing identifier
     */
    testID?: string;
}
interface Props extends TabControllerItemProps {
    index: number;
    targetPage: any;
    state: State;
    currentPage: Reanimated.Adaptable<number>;
    onLayout?: (event: LayoutChangeEvent, index: number) => void;
}
/**
 * @description: TabController's TabBarItem
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 * @notes: Must be rendered as a direct child of TabController.TabBar.
 */
export default class TabBarItem extends PureComponent<Props> {
    static displayName: string;
    static defaultProps: {
        activeOpacity: number;
        onPress: (...args: any[]) => void;
    };
    private itemWidth?;
    private itemRef;
    constructor(props: Props);
    onLayout: (event: LayoutChangeEvent) => void;
    onPress: () => void;
    getItemStyle(): any[];
    getLabelStyle(): (TextStyle | _.Dictionary<Reanimated.Node<number> | Reanimated.Node<string | number | boolean> | Reanimated.Node<"normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"> | undefined> | undefined)[];
    getIconStyle(): {
        tintColor: Reanimated.Node<string>;
    };
    render(): JSX.Element;
}
export {};
