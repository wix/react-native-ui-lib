import _pt from "prop-types";
import _ from 'lodash';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import Assets from "../../assets";
import { asBaseComponent } from "../../commons/new";
import { BorderRadiuses, Spacings } from "../../style";
import Avatar from "../avatar";
import Badge, { BADGE_SIZES } from "../badge";
import Image from "../image";
import Text from "../text";
import TouchableOpacity from "../touchableOpacity";
import View from "../view";
//TODO: remove after ComponentPropTypes deprecation;
const DEFAULT_SIZE = 26;
/**
 * @description: Chip component
 * @extends: TouchableOpacity
 * @extendsLink: docs/TouchableOpacity
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ChipScreen.tsx
 * @image: https://user-images.githubusercontent.com/1780255/119636022-e9743180-be1c-11eb-8f02-22eeab6558cd.png
 */

const Chip = ({
  avatarProps,
  backgroundColor,
  badgeProps,
  useCounter,
  borderRadius = BorderRadiuses.br100,
  containerStyle,
  onDismiss,
  dismissColor,
  dismissIcon = Assets.icons.x,
  dismissIconStyle,
  dismissContainerStyle,
  iconProps,
  iconSource,
  iconStyle,
  rightIconSource,
  leftElement,
  rightElement,
  label,
  labelStyle,
  onPress,
  resetSpacings,
  size = DEFAULT_SIZE,
  useSizeAsMinimum = true,
  testID,
  ...others
}) => {
  const renderIcon = useCallback(iconPosition => {
    const isLeftIcon = iconPosition === 'left';
    return <Image // @ts-ignore
    source={isLeftIcon ? iconSource : rightIconSource} testID={`${testID}.icon`} {...iconProps} style={[getMargins('iconSource'), iconStyle]} />;
  }, [iconSource, rightIconSource, iconStyle, iconProps]);
  const renderBadge = useCallback(() => {
    return <Badge size={BADGE_SIZES.default} testID={`${testID}.counter`} backgroundColor={useCounter ? 'transparent' : undefined} {...badgeProps} // @ts-ignore
    containerStyle={[getMargins('badge'), badgeProps.containerStyle]} />;
  }, [badgeProps]);
  const renderOnDismiss = useCallback(() => {
    return <TouchableOpacity style={[getMargins('dismiss'), dismissContainerStyle]} onPress={onDismiss} hitSlop={{
      top: 10,
      bottom: 10,
      left: 10,
      right: 10
    }} testID={`${testID}.dismiss`}>
        <Image // @ts-ignore
      source={dismissIcon} tintColor={dismissColor} style={[dismissIconStyle]} accessibilityLabel="dismiss" testID={`${testID}.dismissIcon`} />
      </TouchableOpacity>;
  }, [dismissContainerStyle, onDismiss, dismissIcon, dismissIconStyle]);
  const renderAvatar = useCallback(() => {
    return <Avatar size={20} testID={`${testID}.avatar`} {...avatarProps} // @ts-ignore
    containerStyle={[getMargins('avatar'), avatarProps.containerStyle]} />;
  }, [avatarProps]);
  const renderLabel = useCallback(() => {
    return <Text text90M numberOfLines={1} style={[styles.label, getMargins('label'), labelStyle]} testID={`${testID}.label`}>
        {!!label && label}
      </Text>;
  }, [label, labelStyle]);
  const getMargins = useCallback(element => {
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

          if (rightElement && leftElement) {
            return {
              marginHorizontally: 2
            };
          }

          if (iconSource || leftElement) {
            return {
              marginLeft: 2,
              marginRight: Spacings.s3
            };
          }

          if (rightIconSource || rightElement) {
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
            return {
              marginHorizontal: Spacings.s3
            };
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
    return typeof size === 'object' ? {
      [width]: _.get(size, 'width'),
      [height]: _.get(size, 'height')
    } : {
      [width]: size,
      [height]: size
    };
  }, [size]);
  const Container = onPress ? TouchableOpacity : View;
  return <Container activeOpacity={1} onPress={onPress} style={[styles.container, {
    backgroundColor
  }, {
    borderRadius
  }, containerStyle, getContainerSize()]} testID={testID} {...others}>
      {avatarProps && renderAvatar()}
      {iconSource && renderIcon('left')}
      {leftElement}
      {label && renderLabel()}
      {rightElement}
      {rightIconSource && renderIcon('right')}
      {badgeProps && renderBadge()}
      {onDismiss && renderOnDismiss()}
    </Container>;
};

Chip.propTypes = {
  /**
     * Chip's size. Number or a width and height object.
     */

  /*GENERAL*/
  size: _pt.oneOfType([_pt.number, _pt.shape({
    width: _pt.number.isRequired,
    height: _pt.number.isRequired
  })]),

  /**
     * On Chip press callback
     */
  onPress: _pt.func,

  /**
     * Chip's background color
     */
  backgroundColor: _pt.string,

  /**
     * The Chip borderRadius
     */
  borderRadius: _pt.number,

  /**
     * Uses size as minWidth and minHeight - default is true
     */
  useSizeAsMinimum: _pt.bool,

  /**
     * Disables all internal elements default spacings. Helps reach a custom design
     */
  resetSpacings: _pt.bool,

  /**
     * Used as testing identifier
     */
  testID: _pt.string,

  /**
     * Main Chip text
     */

  /*LABEL*/
  label: _pt.string,

  /**
     * Display badge as counter (no background)
     */
  useCounter: _pt.bool,

  /**
     * Left custom element
     */

  /*LEFT ELEMENT*/
  leftElement: _pt.element,

  /**
      * Right custom element
      */

  /*RIGHT ELEMENT*/
  rightElement: _pt.element,

  /**
     * Adds a dismiss button and serves as its callback
     */

  /*DISMISS ('x' button)*/
  onDismiss: _pt.func,

  /**
     * Dismiss color
     */
  dismissColor: _pt.string
};
Chip.displayName = 'Chip';
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
export default asBaseComponent(Chip);