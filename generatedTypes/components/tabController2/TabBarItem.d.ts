import { ReactElement } from 'react';
import { TextStyle, LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';
import Reanimated from 'react-native-reanimated';
import { BadgeProps } from '../badge';
export interface TabControllerItemProps {
    /**
     * label of the tab
     */
    label?: string;
    /**
     * custom label style
     */
    labelStyle?: StyleProp<TextStyle>;
    /**
     * custom selected label style
     */
    selectedLabelStyle?: StyleProp<TextStyle>;
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
     * Pass to render a leading element
     */
    leadingAccessory?: ReactElement;
    /**
     * Pass to render a trailing element
     */
    trailingAccessory?: ReactElement;
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
    currentPage: Reanimated.Adaptable<number>;
    onLayout?: (event: LayoutChangeEvent, index: number) => void;
}
/**
 * @description: TabController's TabBarItem
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 * @notes: Must be rendered as a direct child of TabController.TabBar.
 */
export default function TabBarItem({ index, label, labelColor, selectedLabelColor, labelStyle, selectedLabelStyle, icon, badge, leadingAccessory, trailingAccessory, uppercase, activeOpacity, activeBackgroundColor, testID, ignore, style, ...props }: Props): JSX.Element;
export {};
