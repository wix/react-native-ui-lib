import React from 'react';
import { LayoutChangeEvent } from 'react-native';
import { PointProps } from './types';
type PointPropsInternal = PointProps & {
    onLayout?: (event: LayoutChangeEvent) => void;
    testID?: string;
};
declare const Point: (props: PointPropsInternal) => React.JSX.Element;
export default Point;
