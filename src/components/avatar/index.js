import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, ViewPropTypes, TouchableOpacity} from 'react-native';
import _ from 'lodash';
import {BaseComponent} from '../../commons';
import {Constants} from '../../helpers';
import {Colors, BorderRadiuses} from '../../style';
import View from '../view';
import Text from '../text';
import Image from '../image';

export const STATUS_MODES = {
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
  AWAY: 'AWAY',
  NONE: 'NONE',
};

/**
 * @description: Avatar component for displaying user profile images
 * @extends: TouchableOpacity
 * @extendsnotes: (when passing onPress)
 * @extendslink: docs/TouchableOpacity
 * @image: https://user-images.githubusercontent.com/33805983/34480603-197d7f64-efb6-11e7-9feb-db8ba756f055.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/AvatarsScreen.js
 */
export default class Avatar extends BaseComponent {
  static displayName = 'Avatar';
  static modes = STATUS_MODES;
  static propTypes = {
    /**
     * Background color for Avatar
     */
    backgroundColor: PropTypes.string,
    /**
     * Additional spacing styles for the container
     */
    containerStyle: ViewPropTypes.style,
    /**
     * The image source (external or assets)
     */
    imageSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
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
     * Use to identify the avatar in tests
     */
    testID: PropTypes.string,
    /**
     * Press handler
     */
    onPress: PropTypes.func,
  };

  static defaultProps = {
    backgroundColor: Colors.dark80,
    size: 50,
    labelColor: Colors.dark10,
    status: STATUS_MODES.NONE,
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  getStatusBadgeColor(status) {
    switch (status) {
      case Avatar.modes.NONE:
        return null;
      case Avatar.modes.AWAY:
        return Colors.yellow30;
      case Avatar.modes.ONLINE:
        return Colors.green30;
      case Avatar.modes.OFFLINE:
        return Colors.dark60;
      default:
        return null;
    }
  }

  getBadgeColor(isOnline, status) {
    const onlineOverride = (status === STATUS_MODES.NONE) ? isOnline : false;
    const badgeColor = onlineOverride ? Colors.green30 : this.getStatusBadgeColor(status);
    return badgeColor;
  }

  renderBadge() {
    const {testID, isOnline, status} = this.props;
    const badgeColor = this.getBadgeColor(isOnline, status);
    if (badgeColor === null) {
      return false;
    }
    return (
      <View style={this.styles.onlineBadge} testID={`${testID}.onlineBadge`}>
        <View style={[this.styles.onlineBadgeInner, {backgroundColor: badgeColor}]} />
      </View>
    );
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
    const {imageSource, onImageLoadStart, onImageLoadEnd, onImageLoadError, testID} = this.props;
    const hasImage = !_.isUndefined(imageSource);
    if (hasImage) {
      return (
        <Image
          style={this.styles.image}
          source={imageSource}
          onLoadStart={onImageLoadStart}
          onLoadEnd={onImageLoadEnd}
          onError={onImageLoadError}
          testID={`${testID}.image`}
        />
      );
    }
    return undefined;
  }

  render() {
    const {label, labelColor: color, imageSource, backgroundColor, onPress, containerStyle, testID} = this.props;
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
      </Container>
    );
  }
}

function createStyles({size, labelColor, imageSource}) {
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
    onlineBadge: {
      height: 13.5,
      width: 13.5,
      padding: 1.5,
      borderRadius: 999,
      backgroundColor: Colors.white,
      position: 'absolute',
      right: imageSource ? -1.5 : 0,
      top: 4.5,
    },
    onlineBadgeInner: {
      flex: 1,
      borderRadius: 999,
      // backgroundColor: Colors.green30,
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
