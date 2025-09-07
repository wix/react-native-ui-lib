import _isEmpty from "lodash/isEmpty";
import _isUndefined from "lodash/isUndefined";
import _isNil from "lodash/isNil";
import _toLower from "lodash/toLower";
import _split from "lodash/split";
import React, { useMemo, forwardRef } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, BorderRadiuses } from "../../style";
import { extractAccessibilityProps } from "../../commons/modifiers";
import Badge from "../badge";
import View from "../view";
import Text from "../text";
import Image from "../image";
// @ts-ignore
import AnimatedImage from "../animatedImage";
import * as AvatarHelper from "../../helpers/AvatarHelper";
import { useThemeProps } from "../../hooks";
import { isSvg } from "../../utils/imageUtils";
import Constants from "../../commons/Constants";
export let BadgePosition = /*#__PURE__*/function (BadgePosition) {
  BadgePosition["TOP_RIGHT"] = "TOP_RIGHT";
  BadgePosition["TOP_LEFT"] = "TOP_LEFT";
  BadgePosition["BOTTOM_RIGHT"] = "BOTTOM_RIGHT";
  BadgePosition["BOTTOM_LEFT"] = "BOTTOM_LEFT";
  return BadgePosition;
}({});
const DEFAULT_BADGE_SIZE = 10;
/**
 * @description: Avatar component for displaying user profile images
 * @extends: TouchableOpacity, Image
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Avatar/Avarat_1.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Avatar/Avarat_2.png?raw=true
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/AvatarsScreen.tsx
 */
const Avatar = forwardRef((props, ref) => {
  const themeProps = useThemeProps(props, 'Avatar');
  const {
    source,
    size = 50,
    labelColor = Colors.$textDefault,
    badgeProps = {},
    badgePosition = BadgePosition.TOP_RIGHT,
    testID,
    ribbonLabel,
    customRibbon,
    ribbonStyle,
    ribbonLabelStyle,
    animate = false,
    imageStyle,
    onImageLoadStart,
    onImageLoadEnd,
    onImageLoadError,
    imageProps,
    label,
    name,
    backgroundColor,
    useAutoColors,
    autoColorsConfig,
    containerStyle,
    labelEllipsizeMode = 'clip',
    onPress,
    children
  } = themeProps;
  const hitTargetPadding = Math.max(0, (48 - size) / 2);
  const {
    size: _badgeSize,
    borderWidth: badgeBorderWidth = 0
  } = badgeProps;
  const badgeSize = _badgeSize || DEFAULT_BADGE_SIZE;
  const _baseContainerStyle = useMemo(() => {
    return {
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: BorderRadiuses.br100
    };
  }, [size]);
  const initialsStyle = useMemo(() => {
    return {
      color: labelColor,
      backgroundColor: 'transparent',
      lineHeight: undefined
    };
  }, [labelColor]);
  const _baseRibbonStyle = useMemo(() => {
    return {
      position: 'absolute',
      top: '10%',
      left: size / 1.7,
      borderRadius: size / 2
    };
  }, [size]);
  const _ribbonStyle = useMemo(() => {
    return [_baseRibbonStyle, styles.ribbon, ribbonStyle];
  }, [_baseRibbonStyle, ribbonStyle]);
  const _badgePosition = useMemo(() => {
    const radius = size / 2;
    const x = Math.sqrt(radius ** 2 * 2);
    const y = x - radius;
    const shift = Math.sqrt(y ** 2 / 2) - (badgeSize + badgeBorderWidth * 2) / 2;
    const badgeLocation = _split(_toLower(badgePosition), '_', 2);
    return {
      position: 'absolute',
      [badgeLocation[0]]: shift,
      [badgeLocation[1]]: shift
    };
  }, [size, badgeBorderWidth, badgeSize, badgePosition]);
  const text = useMemo(() => {
    let text = label;
    if (_isNil(label) && !_isNil(name)) {
      text = AvatarHelper.getInitials(name);
    }
    return text;
  }, [label, name]);
  const _backgroundColor = useMemo(() => {
    if (backgroundColor) {
      return backgroundColor;
    }
    const {
      avatarColors = AvatarHelper.getAvatarColors(),
      hashFunction = AvatarHelper.hashStringToNumber,
      defaultColor = Colors.$backgroundNeutralLight
    } = autoColorsConfig || {};
    if (useAutoColors) {
      return AvatarHelper.getBackgroundColor(name, avatarColors, hashFunction, defaultColor);
    } else {
      return defaultColor;
    }
  }, [backgroundColor, autoColorsConfig, useAutoColors, name]);
  const _containerStyle = useMemo(() => {
    return [_baseContainerStyle, containerStyle];
  }, [_baseContainerStyle, containerStyle]);
  const textStyle = useMemo(() => {
    const typography = AvatarHelper.getInitialsTypography(size);
    return [typography, initialsStyle, {
      color: labelColor
    }];
  }, [size, initialsStyle, labelColor]);
  const textContainerStyle = useMemo(() => {
    const hasImage = !_isUndefined(source);
    return [styles.initialsContainer, {
      backgroundColor: _backgroundColor
    }, hasImage && styles.initialsContainerWithInset];
  }, [source, _backgroundColor]);
  const accessibilityProps = useMemo(() => {
    return extractAccessibilityProps(props);
  }, [props]);
  const _imageStyle = useMemo(() => {
    return [_baseContainerStyle, StyleSheet.absoluteFillObject, imageStyle];
  }, [_baseContainerStyle, imageStyle]);
  const renderImage = () => {
    if (source !== undefined) {
      // Looks like reanimated does not support SVG
      const ImageContainer = animate && !isSvg(source) && !Constants.isWeb ? AnimatedImage : Image;
      return <ImageContainer style={_imageStyle} source={source} onLoadStart={onImageLoadStart} onLoadEnd={onImageLoadEnd} onError={onImageLoadError} testID={`${testID}.image`} width={size} height={size} containerStyle={_baseContainerStyle} {...imageProps} />;
    }
  };
  const renderBadge = () => {
    if (!_isEmpty(badgeProps)) {
      return <Badge testID={`${testID}.onlineBadge`} iconProps={{
        tintColor: null
      }} {...badgeProps} size={badgeSize} containerStyle={_badgePosition} />;
    }
  };
  const renderRibbon = () => {
    if (!customRibbon && ribbonLabel) {
      return <View style={_ribbonStyle}>
          <Text numberOfLines={1} text100 $textDefaultLight style={ribbonLabelStyle}>
            {ribbonLabel}
          </Text>
        </View>;
    }
  };
  const renderCustomRibbon = () => {
    if (customRibbon) {
      return <View style={_baseRibbonStyle}>{customRibbon}</View>;
    }
  };
  const Container = onPress ? TouchableOpacity : View;
  return <Container style={_containerStyle} ref={ref} testID={testID} onPress={onPress} accessible={!_isUndefined(onPress)} accessibilityLabel={'Avatar'} accessibilityRole={onPress ? 'button' : 'image'} hitSlop={onPress ? hitTargetPadding : undefined} {...accessibilityProps}>
      <View testID={`${testID}.container`} style={textContainerStyle}>
        {!_isUndefined(text) && <Text numberOfLines={1} ellipsizeMode={labelEllipsizeMode} style={textStyle} testID={`${testID}.label`} accessibilityLabel={accessibilityProps?.accessibilityLabel}>
            {text}
          </Text>}
      </View>
      {renderImage()}
      {renderBadge()}
      {renderCustomRibbon()}
      {renderRibbon()}
      {children}
    </Container>;
});
const styles = StyleSheet.create({
  initialsContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadiuses.br100,
    overflow: 'hidden'
  },
  initialsContainerWithInset: {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1
  },
  ribbon: {
    backgroundColor: Colors.$backgroundPrimaryHeavy,
    paddingHorizontal: 6,
    paddingVertical: 3
  }
});

// @ts-expect-error
Avatar.badgePosition = BadgePosition;
export { Avatar }; // For tests

export default Avatar;