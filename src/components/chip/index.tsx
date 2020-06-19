import _ from 'lodash';
import React from 'react';
import {StyleSheet, StyleProp, ViewStyle, ViewProps, TouchableOpacityProps, ImageStyle, TextStyle, ImageSourcePropType} from 'react-native';
import {AvatarProps, BadgeProps} from 'typings';
// @ts-ignore
import Assets from '../../assets';
import {asBaseComponent} from '../../commons/new';
import {Spacings, Colors} from '../../style';
// @ts-ignore
import Avatar from '../avatar';
// @ts-ignore
import Badge, {BADGE_SIZES} from '../badge';
import Image from '../image';
import Text from '../text';
import TouchableOpacity from '../touchableOpacity';
import View from '../view';

interface ChipProps {
  /**
   * Chip's size. Number or a width and height object.
   */
  size?: number | object;
  /**
   * On Chip press callback
   */
  onPress?: (props: any) => void;
  /**
   * Chip's background color
   */
  backgroundColor?: string;
  /**
   * Sets size to use minWidth and minHeight - default is true
   */
  minSize?: boolean;
  /**
   * Disables all internal elements default spacings. Helps reach a custom design
   */
  resetSpacings?: boolean;
  /**
   * The Chip borderRadius
   */
  borderRadius?: number;
  /**
   * Displays counter as a Badge
   */
  useBadge?: boolean;
  /**
   * Badge props object.
   */
  badgeProps?: BadgeProps;
  /**
   * Chip's container style
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Main Chip text
   */
  label?: string;
  /**
   * Color of the label.
   */
  labelColor?: string;
  /**
   * Label's style
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Text to show to the right of the label or inside the Badge.
   */
  counterLabel?: string;
  /**
   * Color of the counter label.
   */
  counterColor?: string;
  /**
   * Counter's style
   */
  counterStyle?: StyleProp<TextStyle>;
  /**
   * Adds a dismiss button and serves as its callback
   */
  onDismiss?: (props: any) => void;
  /**
   * Dismiss (X button) color
   */
  dismissColor?: string;
  /**
   * Dismiss (X button) asset
   */
  dismissIcon?: ImageSourcePropType;
  /**
   * Dismiss (X button) style
   */
  dismissIconStyle?: StyleProp<ImageStyle>;
  /**
   * Dismiss (X button) container style
   */
  dismissContainerStyle?: StyleProp<ImageStyle>;
  /**
   * Avatar props object
   */
  avatar?: AvatarProps;
  /**
   * Icon's source
   */
  iconSource?: ImageSourcePropType;
  /**
   * Icon's color
   */
  iconColor?: string;
  /**
   * Icon style
   */
  iconStyle?: StyleProp<ImageStyle>;
  /**
   * Used as testing identifier
   */
  testID?: string;
}

type Props = ChipProps & ViewProps & TouchableOpacityProps;

/**
 * @description: Chip component
 * @extends: TouchableOpacity
 * @extendslink: docs/TouchableOpacity
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ChipScreen.tsx
 */
const Chip: React.FC<ChipProps> = (props) => {
  Chip.displayName = 'Chip';

  const {
    avatar,
    backgroundColor,
    borderRadius = 20,
    badgeProps,
    counterLabel,
    counterColor = Colors.grey20,
    counterStyle,
    containerStyle,
    dismissColor,
    dismissIcon = Assets.icons.x,
    dismissIconStyle,
    iconColor,
    iconSource,
    iconStyle,
    label,
    labelStyle,
    labelColor,
    minSize = true,
    onDismiss,
    dismissContainerStyle,
    onPress,
    resetSpacings,
    size = 24,
    testID,
    useBadge,
    ...others
  } = props;

  const renderIcon = () => {
    return (
      <Image
      // @ts-ignore
        source={iconSource}
        tintColor={iconColor}
        style={[iconStyle, getMargins('iconSource')]}
        testID={`${testID}.icon`}
      />
    );
  };

  const renderCounter = () => {
    if (useBadge) {
      return (
        <Badge
          label={counterLabel}
          backgroundColor={Colors.red30}
          size={BADGE_SIZES.medium}
          style={[getMargins('counter')]}
          labelColor={counterColor}
          {...badgeProps}
          {...counterStyle}
          testID={`${testID}.counter`}
        />
      );
    }
    return (
      <Text
        text90R
        color={counterColor}
        style={[getMargins('counter'), counterStyle]}
        testID={`${testID}.counter`}
      >
        {counterLabel}
      </Text>
    );
  };

  const renderOnDismiss = () => {
    return (
      <TouchableOpacity
        style={[getMargins('dismiss'), dismissContainerStyle]}
        onPress={onDismiss}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        testID={`${testID}.dismiss`}
      >
        <Image
          source={dismissIcon}
          tintColor={dismissColor}
          style={[dismissIconStyle]}
          accessibilityLabel="dismiss"
          testID={`${testID}.dismiss`}
        />
      </TouchableOpacity>
    );
  };

  const renderAvatar = () => {
    return (
      <Avatar
        size={20}
        {...avatar}
        // @ts-ignore
        containerStyle={[getMargins('avatar'), avatar.containerStyle]}
        testID={`${testID}.avatar`}
      />
    );
  };

  const renderLabel = () => {
    return (
      <Text
        text90M
        numberOfLines={1}
        // @ts-ignore
        tintColor={labelColor}
        style={[styles.label, getMargins('label'), labelStyle]}
        testID={`${testID}.label`}
      >
        {label}
      </Text>
    );
  };

  const getMargins = (element: string): object | undefined => {
    if (!resetSpacings) {
      switch (element) {
        case 'label':
          if (counterLabel) {
            return {
              marginLeft: Spacings.s3,
              marginRight: Spacings.s1
            };
          }
          if (onDismiss) {
            return {
              marginLeft: Spacings.s3,
              marginRight: Spacings.s2
            };
          }
          if (avatar) {
            return {
              marginRight: Spacings.s2,
              marginLeft: Spacings.s1
            };
          }
          if (iconSource) {
            return {
              marginLeft: 2,
              marginRight: Spacings.s2
            };
          } else {
            return {marginHorizontal: Spacings.s3};
          }
        case 'avatar':
          return {
            marginLeft: 2
          };
        case 'counter':
          return {
            marginRight: useBadge ? Spacings.s2 : Spacings.s3
          };
        case 'dismiss':
          return {
            marginRight: Spacings.s2
          };
      }
    }
  };

  const getContainerSize = () => {
    const width = minSize ? 'minWidth' : 'width';
    const height = minSize ? 'minHeight' : 'height';

    return typeof size === 'object'
      ? {[width]: _.get(size, 'width'), [height]: _.get(size, 'height')}
      : {[width]: size, [height]: size};
  };

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      activeOpacity={1}
      onPress={onPress}
      style={[
        styles.container,
        {backgroundColor},
        {borderRadius},
        containerStyle,
        getContainerSize()
      ]}
      testID={testID}
      {...others}
    >
      {avatar && renderAvatar()}
      {iconSource && renderIcon()}
      {label && renderLabel()}
      {counterLabel && renderCounter()}
      {onDismiss && renderOnDismiss()}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1
  },
  label: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default asBaseComponent<Props>(Chip);
