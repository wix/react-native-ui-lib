import isUndefined from 'lodash/isUndefined';
import React, {useMemo, forwardRef} from 'react';
import {Image, ImageProps, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {asBaseComponent, BaseComponentInjectedProps, MarginModifiers, Constants} from '../../commons/new';
import {ComponentStatics} from '../../typings/common';
import {getAsset, isSvg, isBase64ImageContent} from '../../utils/imageUtils';
import {RecorderProps} from '../../typings/recorderTypes';
import Badge, {BadgeProps} from '../badge';
import SvgImage from '../svgImage';
import type {ImageSourceType} from '../image';

export type IconProps = Omit<ImageProps, 'source'> &
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
    size?: number;
    /**
     * whether the icon should flip horizontally on RTL
     */
    supportRTL?: boolean;
    source?: ImageSourceType
  };

/**
 * @description: Icon component
 * @extends: Image
 * @extendsLink: https://reactnative.dev/docs/image
 */

type Props = IconProps & BaseComponentInjectedProps;

const DEFAULT_WEB_ICON_SIZE = 16;

const Icon = forwardRef((props: Props, ref: any) => {
  const {
    size = Constants.isWeb ? DEFAULT_WEB_ICON_SIZE : undefined,
    tintColor,
    style,
    supportRTL,
    source,
    assetGroup,
    assetName,
    modifiers,
    recorderTag,
    badgeProps,
    ...others
  } = props;
  const {margins} = modifiers;
  const iconSize = size ? {width: size, height: size} : undefined;
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

  const iconSource = useMemo(() => {
    if (!isUndefined(assetName)) {
      return getAsset(assetName, assetGroup);
    }
    return source;
  }, [source, assetGroup, assetName]);

  const renderImage = () => (
    <Image
      fsTagName={recorderTag}
      {...others}
      ref={ref}
      source={iconSource}
      style={[style, margins, iconSize, shouldFlipRTL && styles.rtlFlipped, !!tintColor && {tintColor}]}
    />
  );

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
Icon.defaultProps = {
  assetGroup: 'icons'
};

export default asBaseComponent<IconProps, ComponentStatics<typeof Icon>>(Icon, {modifiersOptions: {margins: true}});

const styles = StyleSheet.create({
  rtlFlipped: {
    transform: [{scaleX: -1}]
  }
});
