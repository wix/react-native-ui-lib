import React, { PropsWithChildren } from 'react';
import { ImageRequireSource } from 'react-native';
import { IconProps } from '../icon';
export declare enum StateTypes {
    CURRENT = "current",
    NEXT = "next",
    ERROR = "error",
    SUCCESS = "success"
}
export declare enum LineTypes {
    SOLID = "solid",
    DASHED = "dashed"
}
export declare enum PointTypes {
    BULLET = "bullet",
    CIRCLE = "circle",
    OUTLINE = "outline"
}
export type LineProps = {
    state?: StateTypes;
    type?: LineTypes | `${LineTypes}`;
    color?: string;
    /** to mark as entry point */
    entry?: boolean;
    width?: number;
};
export type PointProps = {
    state?: StateTypes | `${StateTypes}`;
    type?: PointTypes | `${PointTypes}`;
    color?: string;
    icon?: ImageRequireSource;
    iconProps?: IconProps;
    removeIconBackground?: boolean;
    label?: number;
    labelColor?: string;
    /** to align point to this view's center */
    anchorRef?: React.MutableRefObject<undefined>;
};
export type Layout = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export type TimelineProps = PropsWithChildren<{
    topLine?: LineProps;
    bottomLine?: LineProps;
    point?: PointProps;
    testID?: string;
}>;
