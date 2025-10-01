import React from 'react';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';
export type Layout = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export interface DashProps extends ViewProps {
    vertical?: boolean;
    gap?: number;
    length?: number;
    thickness?: number;
    color?: string;
    style?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
}
declare const Dash: (props: DashProps) => React.JSX.Element;
export default Dash;
