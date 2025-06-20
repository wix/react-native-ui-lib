import React, {useCallback, useMemo} from 'react';
import {StyleSheet, StyleProp, ViewStyle, ViewProps, ImageStyle, TextStyle, ImageSourcePropType} from 'react-native';
import Assets from '../../assets';
import {asBaseComponent} from '../../commons/new';
import {BorderRadiuses, Spacings, Colors} from 'style';
import Avatar, {AvatarProps} from '../avatar';
import Badge, {BadgeProps} from '../badge';
import Text from '../text';
import TouchableOpacity, {TouchableOpacityProps} from '../touchableOpacity';
import View from '../view';
import Icon, {IconProps} from '../icon';

export type ChipProps = ViewProps &
  TouchableOpacityProps & {
    //GENERAL
    /**
     * Chip's size. Number or a width and height object.
     */
    size?: number | Partial<{width: number; height: number}>;
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
    /**
     * Display badge as counter (no background)
     */
    useCounter?: boolean;
    //AVATAR
    /**
     * Avatar props object
     */
    avatarProps?: AvatarProps;

    //ICON GENERAL
    /**
     * Additional icon props
     */
    iconProps?: Omit<IconProps, 'source'>;
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

    //LEFT ELEMENT
    /**
     * Left custom element
     */
    leftElement?: JSX.Element;

    //RIGHT ELEMENT
    /**
     * Right custom element
     */
    rightElement?: JSX.Element;

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
  };

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
}: ChipProps) => {
  const renderIcon = useCallback((iconPosition: 'left' | 'right') => {
    const isLeftIcon = iconPosition === 'left';

    return (
      <Icon
        source={isLeftIcon ? iconSource : rightIconSource}
        testID={`${testID}.icon`}
        tintColor={Colors.$iconDefault}
        {...iconProps}
        style={[getMargins('iconSource'), iconStyle]}
      />
    );
  },
  [iconSource, rightIconSource, iconStyle, iconProps]);

  const renderBadge = useCallback(() => {
    return (
      <Badge
        size={20}
        testID={`${testID}.counter`}
        backgroundColor={useCounter ? 'transparent' : undefined}
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
        hitSlop={{top: 16, bottom: 16, left: 10, right: 10}}
        testID={`${testID}.dismiss`}
      >
        <Icon
          source={dismissIcon}
          tintColor={dismissColor}
          style={[dismissIconStyle]}
          accessibilityLabel="dismiss"
          testID={`${testID}.dismissIcon`}
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
        $textDefault
        style={[styles.label, getMargins('label'), labelStyle]}
        testID={`${testID}.label`}
        recorderTag={recorderTag}
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
            return {paddingHorizontal: Spacings.s3};
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
  },
  [avatarProps, badgeProps, iconSource, rightIconSource, onDismiss]);

  const chipSize = useMemo(() => {
    const width = typeof size === 'object' ? size.width : size;
    const height = typeof size === 'object' ? size.height : size;
    return {width, height};
  }, [size]);

  const containerSizeStyle = useMemo(() => {
    const {width, height} = chipSize;
    return useSizeAsMinimum ? {minWidth: width, minHeight: height} : {width, height};
  }, [chipSize]);

  const Container = onPress ? TouchableOpacity : View;
  const hitSlop = useMemo(() => {
    const {width = 48, height = 48} = chipSize;
    const verticalHitSlop = Math.max(0, (48 - height) / 2);
    const horizontalHitSlop = Math.max(0, (48 - width) / 2);
    return {
      top: verticalHitSlop,
      bottom: verticalHitSlop,
      left: horizontalHitSlop,
      right: horizontalHitSlop
    };
  }, [chipSize]);

  return (
    <Container
      activeOpacity={1}
      onPress={onPress}
      style={[styles.container, {backgroundColor}, {borderRadius}, containerStyle, containerSizeStyle]}
      testID={testID}
      hitSlop={hitSlop}
      {...others}
    >
      {avatarProps && renderAvatar()}
      {iconSource && renderIcon('left')}
      {leftElement}
      {label && renderLabel()}
      {rightElement}
      {rightIconSource && renderIcon('right')}
      {badgeProps && renderBadge()}
      {onDismiss && renderOnDismiss()}
    </Container>
  );
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

export default asBaseComponent<ChipProps>(Chip);
