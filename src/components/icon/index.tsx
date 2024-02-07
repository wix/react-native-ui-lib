import isUndefined from 'lodash/isUndefined';
import get from 'lodash/get';
import React, {useMemo, forwardRef} from 'react';
import {Image, ImageProps, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {asBaseComponent, BaseComponentInjectedProps, MarginModifiers, Constants} from '../../commons/new';
import {ComponentStatics} from '../../typings/common';
import {getAsset, isSvg, isBase64ImageContent} from '../../utils/imageUtils';
import {RecorderProps} from '../../typings/recorderTypes';
import Badge, {BadgeProps} from '../badge';
import View from '../view';
import SvgImage from '../svgImage';

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
     * Hide badge shown on button
     */
    hideBadge?: boolean;
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
    source?: ImageProps['source'];
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
    hideBadge,
    ...others
  } = props;
  const {margins} = modifiers;
  const shouldShowBadge = !hideBadge && badgeProps;
  const iconSize = size ? {width: size, height: size} : undefined;
  const shouldFlipRTL = supportRTL && Constants.isRTL;

  const getBadgeStyling = (): StyleProp<ViewStyle> => {
    const containerStyle = badgeProps?.containerStyle;
    const badgePosition: StyleProp<ViewStyle> = {
      position: 'absolute',
      top: -3
    };
    if (isPimple()) {
      //badge size 10
      badgePosition.right = (size || 24) / 10;
      badgePosition.top = (size || 24) / 10;
    } else {
      //badge size 16
      badgePosition.right = (size || 24) / 16;
      badgePosition.top = (size || 24) / 16;
    }
    return [badgePosition, containerStyle];
  };

  const getBadgeLabel = () => {
    const {badgeProps} = props;
    const label = get(badgeProps, 'label');
    return label;
  };

  const getBadgeSize = () => {
    const size = isPimple() ? 10 : 16;
    return size;
  };

  const isPimple = () => {
    if (getBadgeLabel() === undefined) {
      return true;
    }
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
    <View style={{borderWidth: 1}}>
      {isSvg(source) ? renderSvg() : renderImage()}
      {shouldShowBadge && (
        <Badge
          pointerEvents={'none'}
          {...badgeProps}
          label={getBadgeLabel()}
          size={getBadgeSize()}
          containerStyle={getBadgeStyling()}
          testID={`${props?.testID}.badge`}
        />
      )}
    </View>
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
