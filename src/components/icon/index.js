import isUndefined from 'lodash/isUndefined';
import React, { useMemo, forwardRef } from 'react';
import { Image, StyleSheet } from 'react-native';
import { asBaseComponent, Constants } from "../../commons/new";
import { getAsset, isSvg, isBase64ImageContent } from "../../utils/imageUtils";
import Badge from "../badge";
import SvgImage from "../svgImage";

/**
 * @description: Icon component
 * @extends: Image
 * @extendsLink: https://reactnative.dev/docs/image
 */

const Icon = forwardRef((props, ref) => {
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
  const {
    margins
  } = modifiers;
  const shouldFlipRTL = supportRTL && Constants.isRTL;
  const getBadgeStyling = () => {
    const containerStyle = badgeProps?.containerStyle;
    const badgeSizeProp = badgeProps?.size || 1;
    const badgePosition = {
      position: 'absolute'
    };
    const position = -badgeSizeProp / 2;
    badgePosition.right = position;
    badgePosition.top = position;
    return [badgePosition, containerStyle];
  };
  const iconSize = useMemo(() => {
    if (typeof size === 'number') {
      return {
        width: size,
        height: size
      };
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
    return <Image accessible={false} accessibilityRole={'image'} fsTagName={recorderTag} {...others} ref={ref} source={iconSource} style={[margins, iconSize, shouldFlipRTL && styles.rtlFlipped, !!tintColor && {
      tintColor
    }, style]} />;
  };
  const renderSvg = () => <SvgImage fsTagName={recorderTag} data={source} {...iconSize} {...props} />;
  if (typeof source === 'string' && isBase64ImageContent(source) && Constants.isWeb) {
    return renderImage();
  }
  return <>
      {isSvg(source) ? renderSvg() : renderImage()}
      {badgeProps && <Badge pointerEvents={'none'} {...badgeProps} containerStyle={getBadgeStyling()} testID={`${props?.testID}.badge`} />}
    </>;
});
Icon.displayName = 'Icon';
Icon.defaultProps = {
  assetGroup: 'icons'
};
export default asBaseComponent(Icon, {
  modifiersOptions: {
    margins: true
  }
});
const styles = StyleSheet.create({
  rtlFlipped: {
    transform: [{
      scaleX: -1
    }]
  }
});