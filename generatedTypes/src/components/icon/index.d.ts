import React from 'react';
import { ImageProps } from 'react-native';
import { BaseComponentInjectedProps, MarginModifiers } from '../../commons/new';
export declare type IconProps = ImageProps & MarginModifiers & {
    /**
     * if provided icon source will be driven from asset name
     */
    assetName?: string;
    /**
     * the asset group, default is "icons"
     */
    assetGroup?: string;
    /**
     * the icon tint
     */
    tintColor?: string;
    /**
     * the icon size
     */
    size?: number;
    /**
     * whether the icon should flip horizontally on RTL
     */
    supportRTL?: boolean;
};
/**
 * @description: Icon component
 * @extends: Image
 * @extendsLink: https://reactnative.dev/docs/image
 */
declare type Props = IconProps & BaseComponentInjectedProps;
declare const _default: React.ComponentClass<ImageProps & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
    /**
     * if provided icon source will be driven from asset name
     */
    assetName?: string | undefined;
    /**
     * the asset group, default is "icons"
     */
    assetGroup?: string | undefined;
    /**
     * the icon tint
     */
    tintColor?: string | undefined;
    /**
     * the icon size
     */
    size?: number | undefined;
    /**
     * whether the icon should flip horizontally on RTL
     */
    supportRTL?: boolean | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}, any> & {
    (props: Props): JSX.Element;
    displayName: string;
    defaultProps: {
        assetGroup: string;
    };
};
export default _default;
