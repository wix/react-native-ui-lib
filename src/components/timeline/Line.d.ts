import React from 'react';
import { ViewStyle } from 'react-native';
import { LineProps } from './types';
type LinePropsInternal = LineProps & {
    top?: boolean;
    style?: ViewStyle;
    testID?: string;
};
declare const Line: React.MemoExoticComponent<(props: LinePropsInternal) => React.JSX.Element>;
export default Line;
