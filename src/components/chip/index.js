import React, { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Assets from "../../assets";
import { asBaseComponent } from "../../commons/new";
import { BorderRadiuses, Spacings, Colors } from "../../style";
import Avatar from "../avatar";
import Badge from "../badge";
import Text from "../text";
import TouchableOpacity from "../touchableOpacity";
import View from "../view";
import Icon from "../icon";
const DEFAULT_SIZE = 26;

/**
 * @description: Chip component
 * @extends: TouchableOpacity
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
  dismissColor = Colors.$iconDefault,
  dismissIcon = Assets.internal.icons.x,
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
  recorderTag,
  testID,
  ...others
}) => {
  const renderIcon = useCallback(iconPosition => {
    const isLeftIcon = iconPosition === 'left';
    return <Icon source={isLeftIcon ? iconSource : rightIconSource} testID={`${testID}.icon`} tintColor={Colors.$iconDefault} {...iconProps} style={[getMargins('iconSource'), iconStyle]} />;
  }, [iconSource, rightIconSource, iconStyle, iconProps]);
  const renderBadge = useCallback(() => {
    return <Badge size={20} testID={`${testID}.counter`} backgroundColor={useCounter ? 'transparent' : undefined} {...badgeProps}
    // @ts-ignore
    containerStyle={[getMargins('badge'), badgeProps.containerStyle]} />;
  }, [badgeProps]);
  const renderOnDismiss = useCallback(() => {
    return <TouchableOpacity style={[getMargins('dismiss'), dismissContainerStyle]} onPress={onDismiss} hitSlop={{
      top: 16,
      bottom: 16,
      left: 10,
      right: 10
    }} testID={`${testID}.dismiss`}>
        <Icon source={dismissIcon} tintColor={dismissColor} style={[dismissIconStyle]} accessibilityLabel="dismiss" testID={`${testID}.dismissIcon`} />
      </TouchableOpacity>;
  }, [dismissContainerStyle, onDismiss, dismissIcon, dismissIconStyle]);
  const renderAvatar = useCallback(() => {
    return <Avatar size={20} testID={`${testID}.avatar`} {...avatarProps}
    // @ts-ignore
    containerStyle={[getMargins('avatar'), avatarProps.containerStyle]} />;
  }, [avatarProps]);
  const renderLabel = useCallback(() => {
    return <Text text90M numberOfLines={1} $textDefault style={[styles.label, getMargins('label'), labelStyle]} testID={`${testID}.label`} recorderTag={recorderTag}>
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
          if (iconSource || leftElement || rightIconSource || rightElement) {
            const addMarginLeft = !!(iconSource || leftElement);
            const addMarginRight = !!(rightIconSource || rightElement);
            const marginFromElement = Spacings.s1;
            if (addMarginLeft && addMarginRight) {
              return {
                marginHorizontal: marginFromElement
              };
            }
            if (addMarginLeft) {
              return {
                marginLeft: marginFromElement,
                marginRight: Spacings.s3
              };
            }
            if (addMarginRight) {
              return {
                marginLeft: Spacings.s3,
                marginRight: marginFromElement
              };
            }
          }
          if (onDismiss) {
            return {
              marginLeft: Spacings.s3,
              marginRight: Spacings.s2
            };
          } else {
            return {
              paddingHorizontal: Spacings.s3
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
  const chipSize = useMemo(() => {
    const width = typeof size === 'object' ? size.width : size;
    const height = typeof size === 'object' ? size.height : size;
    return {
      width,
      height
    };
  }, [size]);
  const containerSizeStyle = useMemo(() => {
    const {
      width,
      height
    } = chipSize;
    return useSizeAsMinimum ? {
      minWidth: width,
      minHeight: height
    } : {
      width,
      height
    };
  }, [chipSize]);
  const Container = onPress ? TouchableOpacity : View;
  const hitSlop = useMemo(() => {
    const {
      width = 48,
      height = 48
    } = chipSize;
    const verticalHitSlop = Math.max(0, (48 - height) / 2);
    const horizontalHitSlop = Math.max(0, (48 - width) / 2);
    return {
      top: verticalHitSlop,
      bottom: verticalHitSlop,
      left: horizontalHitSlop,
      right: horizontalHitSlop
    };
  }, [chipSize]);
  return <Container activeOpacity={1} onPress={onPress} style={[styles.container, {
    backgroundColor
  }, {
    borderRadius
  }, containerStyle, containerSizeStyle]} testID={testID} hitSlop={hitSlop} {...others}>
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
Chip.displayName = 'Chip';
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.$backgroundInverted,
    borderRadius: BorderRadiuses.br100
  },
  label: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default asBaseComponent(Chip);