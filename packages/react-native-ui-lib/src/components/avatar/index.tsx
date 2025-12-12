import _ from 'lodash';
import React, {PropsWithChildren, useMemo, forwardRef} from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  ImagePropsBase,
  ImageStyle,
  TextStyle,
  TextProps,
  AccessibilityProps
} from 'react-native';
import {Colors, BorderRadiuses} from '../../style';
import {extractAccessibilityProps} from '../../commons/modifiers';
import Badge, {BadgeProps} from '../badge';
import View from '../view';
import Text from '../text';
import Image, {ImageProps} from '../image';
// @ts-ignore
import AnimatedImage, {AnimatedImageProps} from '../animatedImage';
import * as AvatarHelper from '../../helpers/AvatarHelper';
import {useThemeProps} from '../../hooks';
import {isSvg} from '../../utils/imageUtils';
import Constants from '../../commons/Constants';

export enum BadgePosition {
  TOP_RIGHT = 'TOP_RIGHT',
  TOP_LEFT = 'TOP_LEFT',
  BOTTOM_RIGHT = 'BOTTOM_RIGHT',
  BOTTOM_LEFT = 'BOTTOM_LEFT'
}

const DEFAULT_BADGE_SIZE = 10;

export type AutoColorsProps = {
  /**
   * Avatar colors to be used when useAutoColors is true
   */
  avatarColors?: string[];
  /**
   * Replace the default hashing function (name -> number)
   */
  hashFunction?: (name?: string) => number;
  /**
   * Background color in cases where the getBackgroundColor returns undefined.
   */
  defaultColor?: string;
};

export type AvatarProps = Pick<AccessibilityProps, 'accessibilityLabel'> &
  PropsWithChildren<{
    /**
     * Adds fade in animation when Avatar image loads
     */
    animate?: boolean;
    /**
     * Background color for Avatar
     */
    backgroundColor?: string;
    /**
     * Badge location on Avatar
     */
    badgePosition?: `${BadgePosition}` | BadgePosition;
    /**
     * Badge props passed down to Badge component
     */
    badgeProps?: BadgeProps;
    /**
     * Additional spacing styles for the container
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * The image source (external or assets)
     */
    source?: ImageProps['source'];
    /**
     * Image props object
     */
    imageProps?: Partial<ImageProps & AnimatedImageProps>;
    /**
     * Image style object used to pass additional style props
     * by components which render image
     */
    imageStyle?: ImageStyle;
    /**
     * Listener-callback for when an image's (uri) loading
     * starts (equiv. to Image.onLoadStart()).
     */
    onImageLoadStart?: ImagePropsBase['onLoadStart'];
    /**
     * Listener-callback for when an image's (uri) loading
     * either succeeds or fails (equiv. to Image.onLoadEnd()).
     */
    onImageLoadEnd?: ImagePropsBase['onLoadEnd'];
    /**
     * Listener-callback for when an image's (uri) loading
     * fails (equiv. to Image.onError()).
     */
    onImageLoadError?: ImagePropsBase['onError'];
    /**
     * The name of the avatar user.
     * If no label is provided, the initials will be generated from the name.
     * autoColorsConfig will use the name to create the background color of the Avatar.
     */
    name?: string;
    /**
     * Hash the name (or label) to get a color, so each name will have a specific color.
     * Default is false.
     */
    useAutoColors?: boolean;
    /**
     * Send this to use the name to infer a backgroundColor
     */
    autoColorsConfig?: AutoColorsProps;
    /**
     * Label that can represent initials
     */
    label?: string;
    /**
     * The label color
     */
    labelColor?: string;
    /*
     * The ellipsize mode for the label, default is clip
     */
    labelEllipsizeMode?: TextProps['ellipsizeMode'];
    /**
     * ribbon label to display on the avatar
     */
    ribbonLabel?: string;
    /**
     * ribbon custom style
     */
    ribbonStyle?: StyleProp<ViewStyle>;
    /**
     * ribbon label custom style
     */
    ribbonLabelStyle?: StyleProp<TextStyle>;
    /**
     * Custom ribbon
     */
    customRibbon?: JSX.Element;
    /**
     * Custom size for the Avatar
     */
    size?: number;
    /**
     * Press handler
     */
    onPress?: (props: any) => void;
    /**
     * Used as a testing identifier
     */
    testID?: string;
  }>;

interface Statics {
  badgePosition: typeof BadgePosition;
}

/**
 * @description: Avatar component for displaying user profile images
 * @extends: TouchableOpacity, Image
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/packages/unicorn-demo-app/showcase/Avatar/Avarat_1.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/packages/unicorn-demo-app/showcase/Avatar/Avarat_2.png?raw=true
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/packages/unicorn-demo-app/src/screens/componentScreens/AvatarsScreen.tsx
 */
const Avatar = forwardRef<any, AvatarProps>((props: AvatarProps, ref: React.ForwardedRef<any>) => {
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
  const {size: _badgeSize, borderWidth: badgeBorderWidth = 0} = badgeProps;
  const badgeSize = _badgeSize || DEFAULT_BADGE_SIZE;

  const _baseContainerStyle: StyleProp<ImageStyle> = useMemo(() => {
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

  const _baseRibbonStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      position: 'absolute',
      top: '10%',
      left: size / 1.7,
      borderRadius: size / 2
    };
  }, [size]);

  const _ribbonStyle: StyleProp<ViewStyle> = useMemo(() => {
    return [_baseRibbonStyle, styles.ribbon, ribbonStyle];
  }, [_baseRibbonStyle, ribbonStyle]);

  const _badgePosition: StyleProp<ViewStyle> = useMemo(() => {
    const radius = size / 2;
    const x = Math.sqrt(radius ** 2 * 2);
    const y = x - radius;
    const shift = Math.sqrt(y ** 2 / 2) - (badgeSize + badgeBorderWidth * 2) / 2;
    const badgeLocation = _.split(_.toLower(badgePosition), '_', 2);
    return {position: 'absolute', [badgeLocation[0]]: shift, [badgeLocation[1]]: shift};
  }, [size, badgeBorderWidth, badgeSize, badgePosition]);

  const text = useMemo(() => {
    let text = label;
    if (_.isNil(label) && !_.isNil(name)) {
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

  const _containerStyle: StyleProp<ViewStyle> = useMemo(() => {
    return [_baseContainerStyle, containerStyle];
  }, [_baseContainerStyle, containerStyle]);

  const textStyle = useMemo(() => {
    const typography = AvatarHelper.getInitialsTypography(size);
    return [typography, initialsStyle, {color: labelColor}];
  }, [size, initialsStyle, labelColor]);

  const textContainerStyle = useMemo(() => {
    const hasImage = !_.isUndefined(source);
    return [
      styles.initialsContainer,
      {backgroundColor: _backgroundColor},
      hasImage && styles.initialsContainerWithInset
    ];
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
      return (
        <ImageContainer
          style={_imageStyle}
          source={source}
          onLoadStart={onImageLoadStart}
          onLoadEnd={onImageLoadEnd}
          onError={onImageLoadError}
          testID={`${testID}.image`}
          width={size}
          height={size}
          containerStyle={_baseContainerStyle}
          {...imageProps}
        />
      );
    }
  };

  const renderBadge = () => {
    if (!_.isEmpty(badgeProps)) {
      return (
        <Badge
          testID={`${testID}.onlineBadge`}
          iconProps={{tintColor: null}}
          {...badgeProps}
          size={badgeSize}
          containerStyle={_badgePosition}
        />
      );
    }
  };

  const renderRibbon = () => {
    if (!customRibbon && ribbonLabel) {
      return (
        <View style={_ribbonStyle}>
          <Text numberOfLines={1} text100 $textDefaultLight style={ribbonLabelStyle}>
            {ribbonLabel}
          </Text>
        </View>
      );
    }
  };

  const renderCustomRibbon = () => {
    if (customRibbon) {
      return <View style={_baseRibbonStyle}>{customRibbon}</View>;
    }
  };

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={_containerStyle}
      ref={ref}
      testID={testID}
      onPress={onPress}
      accessible={!_.isUndefined(onPress)}
      accessibilityLabel={'Avatar'}
      accessibilityRole={onPress ? 'button' : 'image'}
      hitSlop={onPress ? hitTargetPadding : undefined}
      {...accessibilityProps}
    >
      <View testID={`${testID}.container`} style={textContainerStyle}>
        {!_.isUndefined(text) && (
          <Text
            numberOfLines={1}
            ellipsizeMode={labelEllipsizeMode}
            style={textStyle}
            testID={`${testID}.label`}
            accessibilityLabel={accessibilityProps?.accessibilityLabel}
          >
            {text}
          </Text>
        )}
      </View>
      {renderImage()}
      {renderBadge()}
      {renderCustomRibbon()}
      {renderRibbon()}
      {children}
    </Container>
  );
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
export {Avatar}; // For tests

export default Avatar as typeof Avatar & Statics;
