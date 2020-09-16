import _ from 'lodash';
import React, {useCallback} from 'react';
import {StyleSheet, StyleProp, ViewStyle, ViewProps, TouchableOpacityProps, ImageStyle, ImageProps, TextStyle, ImageSourcePropType} from 'react-native';
// @ts-ignore
import Assets from '../../assets';
import {asBaseComponent} from '../../commons/new';
import {BorderRadiuses, Spacings} from '../../style';
// @ts-ignore
import Avatar, {AvatarPropTypes} from '../avatar';
// @ts-ignore
import Badge, {BadgeProps, BADGE_SIZES} from '../badge';
import Image from '../image';
import Text from '../text';
import TouchableOpacity from '../touchableOpacity';
import View from '../view';

export type ChipPropTypes = ViewProps & TouchableOpacityProps & {
  //GENERAL
  /**
   * Chip's size. Number or a width and height object.
   */
  size?: number | {width: number, height: number};
  /**
   * On Chip press callback
   */
  onPress?: (props: any) => void;
  /**
   * Chip's background color
   */
  backgroundColor?: string;
  /**
   * The Chip borderRadius
   */
  borderRadius?: number;
  /**
   * Chip's container style
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Uses size as minWidth and minHeight - default is true
   */
  useSizeAsMinimum?: boolean;
  /**
   * Disables all internal elements default spacings. Helps reach a custom design
   */
  resetSpacings?: boolean;
    /**
   * Used as testing identifier
   */
  testID?: string;

  //LABEL
  /**
   * Main Chip text
   */
  label?: string;
  /**
   * Label's style
   */
  labelStyle?: StyleProp<TextStyle>;

  //BADGE
  /**
   * Badge props object
   */
  badgeProps?: BadgeProps;

  //AVATAR
  /**
   * Avatar props object
   */
  avatarProps?: AvatarPropTypes;

  //ICON GENERAL
  /**
   * Additional icon props
   */
  iconProps?: ImageProps
  /**
   * Icon style
   */
  iconStyle?: StyleProp<ImageStyle>;

  //LEFT ICON
  /**
   * Left icon's source
   */
  iconSource?: ImageSourcePropType;

  //RIGHT ICON
  /**
   * Right icon's source
   */
  rightIconSource?: ImageSourcePropType;

  //DISMISS ('x' button)
  /**
   * Adds a dismiss button and serves as its callback
   */
  onDismiss?: (props: any) => void;
  /**
   * Dismiss color
   */
  dismissColor?: string;
  /**
   * Dismiss asset
   */
  dismissIcon?: ImageSourcePropType;
  /**
   * Dismiss style
   */
  dismissIconStyle?: StyleProp<ImageStyle>;
  /**
   * Dismiss container style
   */
  dismissContainerStyle?: StyleProp<ImageStyle>;
}

/**
 * @description: Chip component
 * @extends: TouchableOpacity
 * @extendslink: docs/TouchableOpacity
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ChipScreen.tsx
 */
const Chip = ({
  avatarProps,
  backgroundColor,
  badgeProps,
  borderRadius,
  containerStyle,
  onDismiss,
  dismissColor,
  dismissIcon,
  dismissIconStyle,
  dismissContainerStyle,
  iconProps,
  iconSource,
  iconStyle,
  rightIconSource,
  label,
  labelStyle,
  onPress,
  resetSpacings,
  size,
  useSizeAsMinimum,
  testID,
  ...others
}: ChipPropTypes) => {

  const renderIcon = useCallback((iconPosition) => {
    const isLeftIcon = iconPosition === 'left';

    return (
      <Image
      // @ts-ignore
        source={isLeftIcon ? iconSource : rightIconSource}
        testID={`${testID}.icon`}
        {...iconProps}
        style={[getMargins('iconSource'), iconStyle]}
      />
    );
  }, [iconSource, rightIconSource, iconStyle, iconProps]);


  const renderBadge = useCallback(() => {
    return (
      <Badge
        size={BADGE_SIZES.default}
        testID={`${testID}.counter`}
        {...badgeProps}
        // @ts-ignore
        containerStyle={[getMargins('badge'), badgeProps.containerStyle]}
      />
    );
  }, [badgeProps]);

  const renderOnDismiss = useCallback(() => {
    return (
      <TouchableOpacity
        style={[getMargins('dismiss'), dismissContainerStyle]}
        onPress={onDismiss}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        testID={`${testID}.dismiss`}
      >
        <Image
        // @ts-ignore
          source={dismissIcon}
          tintColor={dismissColor}
          style={[dismissIconStyle]}
          accessibilityLabel="dismiss"
          testID={`${testID}.dismiss`}
        />
      </TouchableOpacity>
    );
  }, [dismissContainerStyle, onDismiss, dismissIcon, dismissIconStyle]);

  const renderAvatar = useCallback(() => {
    return (
      <Avatar
        size={20}
        testID={`${testID}.avatar`}
        {...avatarProps}
        // @ts-ignore
        containerStyle={[getMargins('avatar'), avatarProps.containerStyle]}
      />
    );
  }, [avatarProps]);

  const renderLabel = useCallback(() => {
    return (
      <Text
        text90M
        numberOfLines={1}
        // @ts-ignore
        style={[styles.label, getMargins('label'), labelStyle]}
        testID={`${testID}.label`}
      >
        {!!label && label}
      </Text>
    );
  }, [label, labelStyle]);

  const getMargins = useCallback((element: string): object | undefined => {
    if (!resetSpacings) {
      switch (element) {
        case 'label':
          if (avatarProps) {
            return {
              marginRight: Spacings.s2,
              marginLeft: Spacings.s1
            };
          }
          if (badgeProps) {
            return {
              marginLeft: Spacings.s3,
              marginRight: Spacings.s1
            };
          }
          if (iconSource) {
            return {
              marginLeft: 2,
              marginRight: Spacings.s3
            };
          }
          if (rightIconSource) {
            return {
              marginLeft: Spacings.s3,
              marginRight: 2
            };
          }
          if (onDismiss) {
            return {
              marginLeft: Spacings.s3,
              marginRight: Spacings.s2
            };
          } else {
            return {marginHorizontal: Spacings.s3};
          }
        case 'avatar':
          return {
            marginLeft: 2
          };
        case 'badge':
          return {
            marginRight: Spacings.s1
          };
        case 'dismiss':
          return {
            marginRight: Spacings.s2
          };
      }
    }
  }, [avatarProps, badgeProps, iconSource, rightIconSource, onDismiss]);

  const getContainerSize = useCallback(() => {
    const width = useSizeAsMinimum ? 'minWidth' : 'width';
    const height = useSizeAsMinimum ? 'minHeight' : 'height';

    return typeof size === 'object'
      ? {[width]: _.get(size, 'width'), [height]: _.get(size, 'height')}
      : {[width]: size, [height]: size};
  }, [size]);

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
      {avatarProps && renderAvatar()}
      {iconSource && renderIcon('left')}
      {label && renderLabel()}
      {rightIconSource && renderIcon('right')}
      {badgeProps && renderBadge()}
      {onDismiss && renderOnDismiss()}
    </Container>
  );
};

Chip.displayName = 'Chip';
Chip.defaultProps = {
  borderRadius: BorderRadiuses.br100,
  dismissIcon: Assets.icons.x,
  useSizeAsMinimum: true,
  size: 26
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: BorderRadiuses.br100
  },
  label: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default asBaseComponent<ChipPropTypes>(Chip);
