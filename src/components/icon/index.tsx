import React, {memo} from 'react';
import {Image, ImageProps} from 'react-native';
import {asBaseComponent, BaseComponentInjectedProps, MarginModifiers} from '../../commons/new';

export type IconProps = ImageProps &
  MarginModifiers & {
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

type Props = IconProps & BaseComponentInjectedProps;

const Icon = memo((props: Props) => {
  const {size, tintColor, style, modifiers, ...others} = props;
  const {margins} = modifiers;
  const iconSize = size ? {width: size, height: size} : undefined;

  return <Image {...others} style={[style, margins, iconSize, {tintColor}]}/>;
});

Icon.displayName = 'Icon';
export default asBaseComponent<IconProps, typeof Icon>(Icon);
