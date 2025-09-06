import { GridListBaseProps } from './types';
export declare const DEFAULT_NUM_COLUMNS = 3;
export declare const DEFAULT_ITEM_SPACINGS: number;
declare const useGridLayout: (props: GridListBaseProps) => {
    itemContainerStyle: {
        width: number;
    };
    numberOfColumns: number;
    itemWidth: number;
    itemSpacing: number;
    listStyle: import("react-native/types").StyleProp<import("react-native/types").ViewStyle>[];
    listContentStyle: import("react-native/types").StyleProp<import("react-native/types").ViewStyle>[];
    listColumnWrapperStyle: import("react-native/types").StyleProp<import("react-native/types").ViewStyle>[];
};
export default useGridLayout;
