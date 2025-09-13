import { PropsWithChildren } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacityProps } from '../touchableOpacity';
export type ListItemProps = TouchableOpacityProps & PropsWithChildren<{
    /**
     * the list item height
     */
    height?: ViewStyle['height'];
    /**
     * action for when pressing the item
     */
    onPress?: () => void;
    /**
     * action for when long pressing the item
     */
    onLongPress?: () => void;
    /**
     * Additional styles for the top container
     */
    containerStyle?: ViewStyle;
    /**
     * The container element to wrap the ListItem
     */
    containerElement?: React.ComponentType<ListItemProps | TouchableOpacityProps>;
    /**
     * The inner element style
     */
    style?: ViewStyle;
    /**
     * The inner element pressed backgroundColor
     */
    underlayColor?: string;
    testID?: string;
}>;
export type ListItemPartProps = PropsWithChildren<{
    /**
     * this part content will be aligned to left
     */
    left?: boolean;
    /**
     * this part content will be aligned to spreaded
     */
    middle?: boolean;
    /**
     * this part content will be aligned to right
     */
    right?: boolean;
    /**
     * this part content direction will be row (default)
     */
    row?: boolean;
    /**
     * this part content direction will be column
     */
    column?: boolean;
    /**
     * container style
     */
    containerStyle?: StyleProp<ViewStyle>;
}>;
