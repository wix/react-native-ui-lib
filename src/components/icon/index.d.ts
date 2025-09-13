import React from 'react';
import { ImageProps as RNImageProps } from 'react-native';
import { BaseComponentInjectedProps, MarginModifiers } from '../../commons/new';
import { ComponentStatics } from '../../typings/common';
import { RecorderProps } from '../../typings/recorderTypes';
import { BadgeProps } from '../badge';
import type { ImageProps } from '../image';
export type IconProps = Omit<RNImageProps, 'source' | 'tintColor'> & MarginModifiers & RecorderProps & {
    /**
     * if provided icon source will be driven from asset name
     */
    assetName?: string;
    /**
     * the asset group, default is "icons"
     */
    assetGroup?: string;
    /**
     * Badge props passed down to Badge component
     */
    badgeProps?: BadgeProps;
    /**
     * the icon tint
     */
    tintColor?: string | null;
    /**
     * the icon size
     */
    size?: number | {
        width: number;
        height: number;
    };
    /**
     * whether the icon should flip horizontally on RTL
     */
    supportRTL?: boolean;
    source?: ImageProps['source'];
};
declare const _default: React.ForwardRefExoticComponent<Omit<RNImageProps, "source" | "tintColor"> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & RecorderProps & {
    /**
     * if provided icon source will be driven from asset name
     */
    assetName?: string | undefined;
    /**
     * the asset group, default is "icons"
     */
    assetGroup?: string | undefined;
    /**
     * Badge props passed down to Badge component
     */
    badgeProps?: BadgeProps | undefined;
    /**
     * the icon tint
     */
    tintColor?: string | null | undefined;
    /**
     * the icon size
     */
    size?: number | {
        width: number;
        height: number;
    } | undefined;
    /**
     * whether the icon should flip horizontally on RTL
     */
    supportRTL?: boolean | undefined;
    source?: import("../image").ImageSourceType;
} & React.RefAttributes<any>> & ComponentStatics<React.ForwardRefExoticComponent<Omit<RNImageProps, "source" | "tintColor"> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & RecorderProps & {
    /**
     * if provided icon source will be driven from asset name
     */
    assetName?: string | undefined;
    /**
     * the asset group, default is "icons"
     */
    assetGroup?: string | undefined;
    /**
     * Badge props passed down to Badge component
     */
    badgeProps?: BadgeProps | undefined;
    /**
     * the icon tint
     */
    tintColor?: string | null | undefined;
    /**
     * the icon size
     */
    size?: number | {
        width: number;
        height: number;
    } | undefined;
    /**
     * whether the icon should flip horizontally on RTL
     */
    supportRTL?: boolean | undefined;
    source?: import("../image").ImageSourceType;
} & BaseComponentInjectedProps & React.RefAttributes<unknown>>>;
export default _default;
