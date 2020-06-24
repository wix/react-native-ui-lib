import _ from 'lodash';
import React, {useCallback} from 'react';
import {StyleSheet, StyleProp, ViewStyle, ViewProps, TouchableOpacityProps, ImageStyle, TextStyle, ImageSourcePropType} from 'react-native';
import {AvatarProps, BadgeProps} from 'typings';
// @ts-ignore
import Assets from '../../assets';
import {asBaseComponent} from '../../commons/new';
import {BorderRadiuses, Colors, Spacings, Typography} from '../../style';
// @ts-ignore
import Avatar from '../avatar';
// @ts-ignore
import Badge, {BADGE_SIZES} from '../badge';
import Image from '../image';
import Text from '../text';
import TouchableOpacity from '../touchableOpacity';
import View from '../view';

interface ChipProps {
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
   * Color of the label.
   */
  labelColor?: string;
  /**
   * Label's style
   */
  labelStyle?: StyleProp<TextStyle>;

  //COUNTER (Badge)
  /**
   * Shows a Badge based counter
   */
  counterLabel?: string;
  /**
   * Used to customize the counter label - extends Badge component props
   */
  counterProps?: BadgeProps;
    /**
   * Displays counter with simpler Ui preset
   */
  counterBasicUi?: boolean;
  /**
   * Avatar props object
   */
  avatar?: AvatarProps;

  //ICON
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

  //DISMISS ('X' button)
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

type Props = ChipProps & ViewProps & TouchableOpacityProps;

/**
 * @description: Chip component
 * @extends: TouchableOpacity
 * @extendslink: docs/TouchableOpacity
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ChipScreen.tsx
 */
const Chip: React.FC<ChipProps> = ({
  avatar,
  backgroundColor,
  borderRadius,
  counterBasicUi,
  counterLabel,
  counterProps,
  containerStyle,
  dismissColor,
  dismissIcon,
  dismissIconStyle,
  iconColor,
  iconSource,
  iconStyle,
  label,
  labelStyle,
  labelColor,
  useSizeAsMinimum,
  onDismiss,
  dismissContainerStyle,
  onPress,
  resetSpacings,
  size,
  testID,
  ...others
}) => {

  const renderIcon = useCallback(() => {
    return (
      <Image
      // @ts-ignore
        source={iconSource}
        tintColor={iconColor}
        style={[iconStyle, getMargins('iconSource')]}
        testID={`${testID}.icon`}
      />
    );
  }, [iconColor, iconSource, iconStyle]);


  const renderCounter = useCallback(() => {
    return (
      <Badge
        label={counterLabel}
        size={BADGE_SIZES.medium}
        backgroundColor={counterBasicUi ? 'transparent' : Colors.red30}
        style={[getMargins('counter')]}
        labelStyle={counterBasicUi && {color: Colors.grey20, ...Typography.text90R}}
        {...counterProps}
        testID={`${testID}.counter`}
      />
    );
  }, [counterLabel, counterProps, counterBasicUi]);

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
        {...avatar}
        // @ts-ignore
        containerStyle={[getMargins('avatar'), avatar.containerStyle]}
        testID={`${testID}.avatar`}
      />
    );
  }, [avatar]);

  const renderLabel = useCallback(() => {
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
  }, [label]);

  const getMargins = useCallback((element: string): object | undefined => {
    if (!resetSpacings) {
      switch (element) {
        case 'label':
          if (avatar) {
            return {
              marginRight: Spacings.s2,
              marginLeft: Spacings.s1
            };
          }
          if (counterLabel) {
            return {
              marginLeft: Spacings.s3,
              marginRight: counterBasicUi ? undefined : Spacings.s1
            };
          }
          if (iconSource) {
            return {
              marginLeft: 2,
              marginRight: Spacings.s2
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
        case 'counter':
          return {
            marginRight: counterBasicUi ? Spacings.s1 : Spacings.s2
          };
        case 'dismiss':
          return {
            marginRight: Spacings.s2
          };
      }
    }
  }, [avatar, counterLabel, counterBasicUi, iconSource, onDismiss]);

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
      {avatar && renderAvatar()}
      {iconSource && renderIcon()}
      {label && renderLabel()}
      {counterLabel && renderCounter()}
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

export default asBaseComponent<Props>(Chip);
