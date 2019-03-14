import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, ViewPropTypes, TouchableOpacity} from 'react-native';
import {Constants} from '../../helpers';
import {Colors, BorderRadiuses} from '../../style';
import {BaseComponent} from '../../commons';
import Badge, {BADGE_SIZES} from '../badge';
import View from '../view';
import Text from '../text';
import Image from '../image';
import AnimatedImage from '../animatedImage';

const deprecatedProps = [
  {old: 'isOnline', new: 'badgeProps.backgroundColor'},
  {old: 'status', new: 'badgeProps.backgroundColor'},
];

export const STATUS_MODES = {
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
  AWAY: 'AWAY',
  NONE: 'NONE',
};

export const BADGE_POSITIONS = {
  TOP_RIGHT: 'TOP_RIGHT',
  BOTTOM_RIGHT: 'BOTTOM_RIGHT',
};

const DEFAULT_BADGE_SIZE = 'pimpleBig';
const DEFAULT_BADGE_POSITION = BADGE_POSITIONS.TOP_RIGHT;

/**
 * @description: Avatar component for displaying user profile images
 * @extends: TouchableOpacity
 * @extendsnotes: (when passing onPress)
 * @extendslink: docs/TouchableOpacity
 * @image: https://user-images.githubusercontent.com/33805983/34480603-197d7f64-efb6-11e7-9feb-db8ba756f055.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/AvatarsScreen.js
 */
export default class Avatar extends BaseComponent {
  constructor(props) {
    super(props);

    deprecatedProps.forEach(prop => {
      if (props[prop.old]) {
        console.warn(`"${prop.old}" property is deprecated, please use "${prop.new}"`);
      }
    });
  }

  static displayName = 'Avatar';
  static modes = STATUS_MODES;
  static badgePosition = BADGE_POSITIONS;
  static propTypes = {
    /**
     * Adds fade in animation when Avatar image loads
     */
    animate: PropTypes.bool,
    /**
     * Background color for Avatar
     */
    backgroundColor: PropTypes.string,
    /**
     * Badge location on Avatar
     */
    badgePosition: PropTypes.oneOf(Object.values(BADGE_POSITIONS)),
    /**
     * Badge props passed down to Badge component
     */
    badgeProps: PropTypes.object,
    /**
     * Additional spacing styles for the container
     */
    containerStyle: ViewPropTypes.style,
    /**
     * The image source (external or assets)
     */
    imageSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    /**
     * Image props object
     */
    imageProps: PropTypes.object,
    /**
     * Image style object used to pass additional style props
     * by components which render image
     */
    imageStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.number]),
    /**
     * Listener-callback for when an image's (uri) loading
     * starts (equiv. to Image.onLoadStart()).
     */
    onImageLoadStart: PropTypes.func,
    /**
     * Listener-callback for when an image's (uri) loading
     * either succeeds or fails (equiv. to Image.onLoadEnd()).
     */
    onImageLoadEnd: PropTypes.func,
    /**
     * Listener-callback for when an image's (uri) loading
     * fails (equiv. to Image.onError()).
     */
    onImageLoadError: PropTypes.func,
    /**
     * Label that can represent initials
     */
    label: PropTypes.string,
    /**
     * The label color
     */
    labelColor: PropTypes.string,
    /**
     * ribbon label to display on the avatar
     */
    ribbonLabel: PropTypes.string,
    /**
     * ribbon custom style
     */
    ribbonStyle: ViewPropTypes.style,
    /**
     * ribbon label custom style
     */
    ribbonLabelStyle: Text.propTypes.style,
    /**
     * Determine if to show online badge
     */
    isOnline: PropTypes.bool,
    /**
     * AWAY, ONLINE, OFFLINE or NONE mode (if set to a value other then 'NONE' will override isOnline prop)
     */
    status: PropTypes.oneOf(Object.keys(STATUS_MODES)),
    /**
     * Custom size for the Avatar
     */
    size: PropTypes.number,
    /**
     * Press handler
     */
    onPress: PropTypes.func,
  };

  static defaultProps = {
    animate: false,
    backgroundColor: Colors.dark80,
    size: 50,
    labelColor: Colors.dark10,
    badgePosition: DEFAULT_BADGE_POSITION,
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  getStatusBadgeColor(status) {
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

  getBadgeSize = () => _.get(this.props, 'badgeProps.size', DEFAULT_BADGE_SIZE);

  getBadgePosition() {
    const {size, badgePosition} = this.props;
    const radius = size / 2;
    const x = Math.sqrt(radius ** 2 * 2);
    const y = x - radius;
    const shift = Math.sqrt(y ** 2 / 2) - (BADGE_SIZES[this.getBadgeSize()] + this.getBadgeBorderWidth() * 2) / 2;

    let badgeAlignment = {};
    switch (badgePosition) {
      case BADGE_POSITIONS.BOTTOM_RIGHT:
        badgeAlignment = {bottom: shift, right: shift};
        break;
      case BADGE_POSITIONS.TOP_RIGHT:
      default:
        badgeAlignment = {top: shift, right: shift};
        break;
    }
    return {position: 'absolute', ...badgeAlignment};
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
    const {ribbonLabel, ribbonStyle, ribbonLabelStyle} = this.props;
    if (ribbonLabel) {
      return (
        <View style={[this.styles.ribbon, ribbonStyle]}>
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
      imageSource,
      onImageLoadStart,
      onImageLoadEnd,
      onImageLoadError,
      testID,
      imageProps,
      imageStyle,
    } = this.props;
    const hasImage = !_.isUndefined(imageSource);
    const ImageContainer = animate ? AnimatedImage : Image;
    if (hasImage) {
      return (
        <ImageContainer
          animate={animate}
          style={[this.styles.image, imageStyle]}
          source={imageSource}
          onLoadStart={onImageLoadStart}
          onLoadEnd={onImageLoadEnd}
          onError={onImageLoadError}
          testID={`${testID}.image`}
          containerStyle={this.styles.container}
          {...imageProps}
        />
      );
    }
    return undefined;
  }

  render() {
    const {
      label,
      labelColor: color,
      imageSource,
      backgroundColor,
      onPress,
      containerStyle,
      children,
      testID,
    } = this.props;
    const Container = onPress ? TouchableOpacity : View;
    const hasImage = !_.isUndefined(imageSource);
    return (
      <Container style={[this.styles.container, containerStyle]} testID={testID} onPress={onPress}>
        <View
          style={[this.styles.initialsContainer, {backgroundColor}, hasImage && this.styles.initialsContainerWithInset]}
        >
          <Text numberOfLines={1} style={[this.styles.initials, {color}]}>
            {label}
          </Text>
        </View>
        {this.renderImage()}
        {this.renderBadge()}
        {this.renderRibbon()}
        {children}
      </Container>
    );
  }
}

function createStyles({size, labelColor}) {
  const borderRadius = size / 2;
  const fontSizeToImageSizeRatio = 0.32;
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      borderRadius,
    },
    initialsContainer: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius,
    },
    initialsContainerWithInset: {
      top: 1,
      right: 1,
      bottom: 1,
      left: 1,
    },
    /*eslint-disable*/
    initials: {
      fontSize: size * fontSizeToImageSizeRatio,
      color: labelColor,
      backgroundColor: 'transparent',
    },
    /*eslint-enable*/
    defaultImage: {
      width: size,
      height: size,
      borderRadius,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      position: 'absolute',
      width: size,
      height: size,
      borderRadius,
    },
    fixAbsolutePosition: {
      position: undefined,
      left: undefined,
      bottom: undefined,
    },
    ribbon: {
      position: 'absolute',
      right: Constants.isIOS ? '-15%' : 0,
      top: Constants.isIOS ? '-10%' : 0,
      backgroundColor: Colors.blue30,
      borderRadius: BorderRadiuses.br100,
      paddingHorizontal: 6,
      paddingVertical: 3,
    },
  });

  return styles;
}
