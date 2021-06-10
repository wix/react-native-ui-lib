import _ from 'lodash';
import React, {PureComponent} from 'react';
import {
  StyleSheet,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  ImagePropsBase,
  ImageStyle,
  TextStyle,
  AccessibilityProps
} from 'react-native';
import memoize from 'memoize-one';
import {Colors} from '../../style';
import {forwardRef, asBaseComponent} from '../../commons/new';
import {extractAccessibilityProps} from '../../commons/modifiers';
//@ts-ignore
import Badge, {BadgeProps, BADGE_SIZES} from '../badge';
import View from '../view';
import Text from '../text';
import Image, {ImageProps} from '../image';
// @ts-ignore
import AnimatedImage from '../animatedImage';
import * as AvatarHelper from '../../helpers/AvatarHelper';

const deprecatedProps = [
  {old: 'isOnline', new: 'badgeProps.backgroundColor'},
  {old: 'status', new: 'badgeProps.backgroundColor'},
  {old: 'imageSource', new: 'source'}
];

export enum StatusModes {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  AWAY = 'AWAY',
  NONE = 'NONE'
}

export enum BadgePosition {
  TOP_RIGHT = 'TOP_RIGHT',
  TOP_LEFT = 'TOP_LEFT',
  BOTTOM_RIGHT = 'BOTTOM_RIGHT',
  BOTTOM_LEFT = 'BOTTOM_LEFT'
}

const DEFAULT_BADGE_SIZE = 'pimpleBig';

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

export type AvatarProps = Pick<AccessibilityProps, 'accessibilityLabel'> & {
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
  badgePosition?: BadgePosition;
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
  source?: ImageSourcePropType;
  /**
   * Image props object
   */
  imageProps?: ImageProps;
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
   * Determine if to show online badge
   */
  isOnline?: boolean;
  /**
   * AWAY, ONLINE, OFFLINE or NONE mode (if set to a value other then 'NONE' will override isOnline prop)
   */
  status?: StatusModes;
  /**
   * Custom size for the Avatar
   */
  size: number;
  /**
   * Press handler
   */
  onPress?: (props: any) => void;
  /**
   * Used as a testing identifier
   */
  testID?: string;
};
export type AvatarPropTypes = AvatarProps; //TODO: remove after ComponentPropTypes deprecation;

/**
 * @description: Avatar component for displaying user profile images
 * @extends: TouchableOpacity
 * @extendsnotes: (when passing onPress)
 * @extendsLink: docs/TouchableOpacity
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Avatar/Avarat_1.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Avatar/Avarat_2.png?raw=true
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/AvatarsScreen.tsx
 */
class Avatar extends PureComponent<AvatarProps> {
  styles: ReturnType<typeof createStyles>;

  constructor(props: AvatarProps) {
    super(props);

    this.styles = createStyles(props);
    deprecatedProps.forEach(prop => {
      //@ts-ignore
      if (props[prop.old]) {
        console.warn(`"Avatar's ${prop.old}" property is deprecated, please use "${prop.new}"`);
      }
    });
  }

  static displayName = 'Avatar';
  static modes = StatusModes;
  static badgePosition = BadgePosition;

  static defaultProps = {
    animate: false,
    size: 50,
    labelColor: Colors.dark10,
    badgePosition: BadgePosition.TOP_RIGHT
  };

  getContainerStyle(): StyleProp<ViewStyle> {
    const {size} = this.props;

    return {
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: size / 2
    };
  }

  getInitialsContainer(): StyleProp<ViewStyle> {
    const {size} = this.props;
    return {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: size / 2
    };
  }

  getRibbonStyle(): StyleProp<ViewStyle> {
    const {size} = this.props;

    return {
      position: 'absolute',
      top: '10%',
      left: size / 1.7,
      borderRadius: size / 2
    };
  }

  getStatusBadgeColor(status: StatusModes | undefined): string | null {
    switch (status) {
      case Avatar.modes.AWAY:
        return Colors.yellow30;
      case Avatar.modes.ONLINE:
        return Colors.green30;
      case Avatar.modes.OFFLINE:
        return Colors.dark60;
      case Avatar.modes.NONE:
      default:
        return null;
    }
  }

  getBadgeBorderWidth = () => _.get(this.props, 'badgeProps.borderWidth', 0);

  getBadgeColor() {
    const {isOnline, status} = this.props;
    const statusColor = this.getStatusBadgeColor(status);
    const onlineColor = isOnline ? Colors.green30 : undefined;

    return _.get(this.props, 'badgeProps.backgroundColor') || statusColor || onlineColor;
  }

  getBadgeSize = () => {
    const badgeSize = this.props?.badgeProps?.size ?? DEFAULT_BADGE_SIZE;

    if (_.isString(badgeSize)) {
      return BADGE_SIZES[badgeSize] || BADGE_SIZES[DEFAULT_BADGE_SIZE];
    }
    return badgeSize;
  };

  getBadgePosition = (): object => {
    const {size, badgePosition} = this.props;
    const radius = size / 2;
    const x = Math.sqrt(radius ** 2 * 2);
    const y = x - radius;
    const shift = Math.sqrt(y ** 2 / 2) - (this.getBadgeSize() + this.getBadgeBorderWidth() * 2) / 2;
    const badgeLocation = _.split(_.toLower(badgePosition), '_', 2);
    const badgeAlignment = {position: 'absolute', [badgeLocation[0]]: shift, [badgeLocation[1]]: shift};

    return badgeAlignment;
  };

  renderBadge() {
    const {testID, badgeProps} = this.props;

    if (badgeProps || this.getBadgeColor()) {
      return (
        <Badge
          backgroundColor={this.getBadgeColor()}
          size={this.getBadgeSize()}
          {...badgeProps}
          containerStyle={this.getBadgePosition()}
          testID={`${testID}.onlineBadge`}
        />
      );
    }
  }

  renderRibbon() {
    const {ribbonLabel, ribbonStyle, ribbonLabelStyle, customRibbon} = this.props;
    if (ribbonLabel) {
      return customRibbon ? (
        <View style={this.getRibbonStyle()}>{customRibbon}</View>
      ) : (
        <View style={[this.getRibbonStyle(), this.styles.ribbon, ribbonStyle]}>
          <Text numberOfLines={1} text100 white style={[ribbonLabelStyle]}>
            {ribbonLabel}
          </Text>
        </View>
      );
    }
  }

  renderImage() {
    const {
      animate,
      source,
      // @ts-ignore
      imageSource,
      onImageLoadStart,
      onImageLoadEnd,
      onImageLoadError,
      testID,
      imageProps,
      imageStyle
    } = this.props;
    const hasImage = !_.isUndefined(imageSource) || !_.isUndefined(source);
    const ImageContainer = animate ? AnimatedImage : Image;
    const avatarImageSource = imageSource || source;

    if (hasImage) {
      return (
        <ImageContainer
          animate={animate}
          style={[this.getContainerStyle(), StyleSheet.absoluteFillObject, imageStyle]}
          source={avatarImageSource}
          onLoadStart={onImageLoadStart}
          onLoadEnd={onImageLoadEnd}
          onError={onImageLoadError}
          testID={`${testID}.image`}
          containerStyle={this.getContainerStyle()}
          {...imageProps}
        />
      );
    }
  }

  getText = memoize((label, name) => {
    let text = label;
    if (_.isNil(label) && !_.isNil(name)) {
      text = AvatarHelper.getInitials(name);
    }

    return text;
  });

  get text() {
    const {label, name} = this.props;
    return this.getText(label, name);
  }

  getBackgroundColor = memoize((text, avatarColors, hashFunction, defaultColor) => {
    return AvatarHelper.getBackgroundColor(text, avatarColors, hashFunction, defaultColor);
  });

  get backgroundColor() {
    const {backgroundColor, useAutoColors, autoColorsConfig, name} = this.props;
    if (backgroundColor) {
      return backgroundColor;
    }

    const {
      avatarColors = AvatarHelper.getAvatarColors(),
      hashFunction = AvatarHelper.hashStringToNumber,
      defaultColor = Colors.grey80
    } = autoColorsConfig || {};
    if (useAutoColors) {
      return this.getBackgroundColor(name, avatarColors, hashFunction, defaultColor);
    } else {
      return defaultColor;
    }
  }

  render() {
    const {
      labelColor: color,
      source,
      //@ts-ignore
      imageSource,
      onPress,
      containerStyle,
      children,
      size,
      testID,
      //@ts-ignore
      forwardedRef
    } = this.props;
    const Container = onPress ? TouchableOpacity : View;
    const hasImage = !_.isUndefined(imageSource) || !_.isUndefined(source);
    const fontSizeToImageSizeRatio = 0.32;
    const fontSize = size * fontSizeToImageSizeRatio;
    const text = this.text;

    return (
      <Container
        style={[this.getContainerStyle(), containerStyle]}
        ref={forwardedRef}
        testID={testID}
        onPress={onPress}
        accessible={!_.isUndefined(onPress)}
        accessibilityLabel={'Avatar'}
        accessibilityRole={onPress ? 'button' : 'image'}
        {...extractAccessibilityProps(this.props)}
      >
        <View
          style={[
            this.getInitialsContainer(),
            {backgroundColor: this.backgroundColor},
            hasImage && this.styles.initialsContainerWithInset
          ]}
        >
          {!_.isUndefined(text) && (
            <Text numberOfLines={1} style={[{fontSize}, this.styles.initials, {color}]} testID={`${testID}.label`}>
              {text}
            </Text>
          )}
        </View>
        {this.renderImage()}
        {this.renderBadge()}
        {this.renderRibbon()}
        {children}
      </Container>
    );
  }
}

function createStyles(props: AvatarProps) {
  const {labelColor} = props;
  const styles = StyleSheet.create({
    initialsContainerWithInset: {
      top: 1,
      right: 1,
      bottom: 1,
      left: 1
    },
    initials: {
      color: labelColor,
      backgroundColor: 'transparent',
      lineHeight: undefined
    },
    ribbon: {
      backgroundColor: Colors.primary,
      paddingHorizontal: 6,
      paddingVertical: 3
    }
  });

  return styles;
}

export {Avatar}; // For tests

export default asBaseComponent<AvatarProps, typeof Avatar>(forwardRef(Avatar));
