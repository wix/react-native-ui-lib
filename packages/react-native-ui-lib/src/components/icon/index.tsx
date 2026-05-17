import isUndefined from 'lodash/isUndefined';
import React, {useMemo, forwardRef} from 'react';
import {Image, ImageProps as RNImageProps, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {asBaseComponent, BaseComponentInjectedProps, MarginModifiers, Constants} from '../../commons/new';
import {ComponentStatics} from '../../typings/common';
import {getAsset, isSvg, isBase64ImageContent} from '../../utils/imageUtils';
import {RecorderProps} from '../../typings/recorderTypes';
import Badge, {BadgeProps} from '../badge';
import SvgImage from '../svgImage';
import type {ImageProps} from '../image';

export type IconProps = Omit<RNImageProps, 'source' | 'tintColor'> &
  MarginModifiers &
  RecorderProps & {
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
    size?: number | {width: number; height: number};
    /**
     * whether the icon should flip horizontally on RTL
     */
    supportRTL?: boolean;
    source?: ImageProps['source'];
  };

/**
 * @description: Icon component
 * @extends: Image
 * @extendsLink: https://reactnative.dev/docs/image
 */

type Props = IconProps & BaseComponentInjectedProps;

const Icon = forwardRef((props: Props, ref: any) => {
  const {
    size,
    tintColor,
    style,
    supportRTL,
    source,
    assetGroup = 'icons',
    assetName,
    modifiers,
    recorderTag,
    badgeProps,
    ...others
  } = props;
  const {margins} = modifiers;
  const shouldFlipRTL = supportRTL && Constants.isRTL;

  const getBadgeStyling = (): StyleProp<ViewStyle> => {
    const containerStyle = badgeProps?.containerStyle;
    const badgeSizeProp = badgeProps?.size || 1;
    const badgePosition: StyleProp<ViewStyle> = {
      position: 'absolute'
    };
    const position = -badgeSizeProp / 2;
    badgePosition.right = position;
    badgePosition.top = position;
    return [badgePosition, containerStyle];
  };

  const iconSize = useMemo(() => {
    if (typeof size === 'number') {
      return {width: size, height: size};
    }
    if (typeof size === 'object') {
      return size;
    }
    return undefined;
  }, [size]);

  const iconSource = useMemo(() => {
    if (!isUndefined(assetName)) {
      return getAsset(assetName, assetGroup);
    }
    return source;
  }, [source, assetGroup, assetName]);

  const renderImage = () => {
    return (
      <Image
        accessible={false}
        accessibilityRole={'image'}
        fsTagName={recorderTag}
        {...others}
        ref={ref}
        source={iconSource}
        style={[margins, iconSize, shouldFlipRTL && styles.rtlFlipped, !!tintColor && {tintColor}, style]}
      />
    );
  };

  const renderSvg = () => <SvgImage fsTagName={recorderTag} data={source} {...iconSize} {...props}/>;

  if (typeof source === 'string' && isBase64ImageContent(source) && Constants.isWeb) {
    return renderImage();
  }

  return (
    <>
      {isSvg(source) ? renderSvg() : renderImage()}
      {badgeProps && (
        <Badge
          pointerEvents={'none'}
          {...badgeProps}
          containerStyle={getBadgeStyling()}
          testID={`${props?.testID}.badge`}
        />
      )}
    </>
  );
});

Icon.displayName = 'Icon';

export default asBaseComponent<IconProps, ComponentStatics<typeof Icon>>(Icon, {modifiersOptions: {margins: true}});

const styles = StyleSheet.create({
  rtlFlipped: {
    transform: [{scaleX: -1}]
  }
});
