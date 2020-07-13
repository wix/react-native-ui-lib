import _ from 'lodash';
import React , {PureComponent} from 'react';
import {StyleSheet, ImageSourcePropType, StyleProp, ViewStyle, TouchableOpacity, ImagePropsBase, ImageStyle, TextStyle} from 'react-native';
import {Colors} from '../../style';
import {forwardRef, asBaseComponent} from '../../commons/new';
import {extractAccessibilityProps} from '../../commons/modifiers';
//@ts-ignore
import Badge, {BADGE_SIZES} from '../badge';
import View from '../view';
import Text from '../text';
import Image, {ImageProps} from '../image';
// @ts-ignore
import AnimatedImage from '../animatedImage';

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
};

export enum BadgePosition {
  TOP_RIGHT = 'TOP_RIGHT',
  TOP_LEFT = 'TOP_LEFT',
  BOTTOM_RIGHT = 'BOTTOM_RIGHT',
  BOTTOM_LEFT = 'BOTTOM_LEFT'
};

const DEFAULT_BADGE_SIZE = 'pimpleBig';

export type AvatarPropTypes = {
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
  badgePosition?: BadgePosition,
  /**
   * Badge props passed down to Badge component
   */
  badgeProps?: object;
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
  onImageLoadStart?: ImagePropsBase["onLoadStart"];
  /**
   * Listener-callback for when an image's (uri) loading
   * either succeeds or fails (equiv. to Image.onLoadEnd()).
   */
  onImageLoadEnd?: ImagePropsBase["onLoadEnd"];
  /**
   * Listener-callback for when an image's (uri) loading
   * fails (equiv. to Image.onError()).
   */
  onImageLoadError?: ImagePropsBase["onError"];
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

/**
 * @description: Avatar component for displaying user profile images
 * @extends: TouchableOpacity
 * @extendsnotes: (when passing onPress)
 * @extendslink: docs/TouchableOpacity
 * @image: https://user-images.githubusercontent.com/33805983/34480603-197d7f64-efb6-11e7-9feb-db8ba756f055.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/AvatarsScreen.js
 */
class Avatar extends PureComponent<AvatarPropTypes> {

  styles: ReturnType<typeof createStyles>;

  constructor(props: AvatarPropTypes) {
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
    backgroundColor: Colors.dark80,
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
    const badgeSize = _.get(this.props, 'badgeProps.size', DEFAULT_BADGE_SIZE);
  
    if (_.isString(badgeSize)) {
      return BADGE_SIZES[badgeSize] || BADGE_SIZES[DEFAULT_BADGE_SIZE];
    }
    return badgeSize;
  }

  getBadgePosition() {
    const {size, badgePosition} = this.props;
    const radius = size / 2;
    const x = Math.sqrt(radius ** 2 * 2);
    const y = x - radius;
    const shift = Math.sqrt(y ** 2 / 2) - (this.getBadgeSize() + this.getBadgeBorderWidth() * 2) / 2;
    const badgeLocation = _.split(_.toLower(badgePosition), '_', 2);
    const badgeAlignment = {position: 'absolute', [badgeLocation[0]]: shift, [badgeLocation[1]]: shift};

    return badgeAlignment;
  }

  renderBadge() {
    const {testID, badgeProps} = this.props;

    if (badgeProps || this.getBadgeColor()) {
      return (
        <Badge
          backgroundColor={this.getBadgeColor()}
          size={this.getBadgeSize()}
          {...badgeProps}
          containerStyle={this.getBadgePosition()}
          label={undefined}
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

  render() {
    const {
      label,
      labelColor: color,
      source,
      //@ts-ignore
      imageSource,
      backgroundColor,
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
          style={[this.getInitialsContainer(), {backgroundColor}, hasImage && this.styles.initialsContainerWithInset]}
        >
          {!_.isUndefined(label) && <Text numberOfLines={1} style={[{fontSize}, this.styles.initials, {color}]}>
            {label}
          </Text>}
        </View>
        {this.renderImage()}
        {this.renderBadge()}
        {this.renderRibbon()}
        {children}
      </Container>
    );
  }
}

function createStyles(props: AvatarPropTypes) {
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
      backgroundColor: 'transparent'
    },
    ribbon: {
      backgroundColor: Colors.blue30,
      paddingHorizontal: 6,
      paddingVertical: 3
    }
  });

  return styles;
}

export {Avatar}; // For tests

export default asBaseComponent<AvatarPropTypes, typeof Avatar>(forwardRef(Avatar))
