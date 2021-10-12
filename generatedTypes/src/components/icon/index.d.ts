import React from 'react';
import { ImageProps } from 'react-native';
import { BaseComponentInjectedProps, MarginModifiers } from '../../commons/new';
export declare type IconProps = ImageProps & MarginModifiers & {
    /**
     * the icon tint
     */
    tintColor?: string;
    /**
     * the icon size
     */
    size?: number;
};
/**
 * @description: Icon component
 * @extends: Image
 * @extendsLink: https://reactnative.dev/docs/image
 */
declare type Props = IconProps & BaseComponentInjectedProps;
declare const _default: React.ComponentClass<ImageProps & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
    /**
     * the icon tint
     */
    tintColor?: string | undefined;
    /**
     * the icon size
     */
    size?: number | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}, any> & React.NamedExoticComponent<ImageProps & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
    /**
     * the icon tint
     */
    tintColor?: string | undefined;
    /**
     * the icon size
     */
    size?: number | undefined;
} & BaseComponentInjectedProps> & {
    readonly type: (props: Props) => JSX.Element;
};
export default _default;
