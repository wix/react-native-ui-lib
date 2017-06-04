import React, {PropTypes} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {BaseComponent} from '../../commons';
import {Colors} from '../../style';

/**
 * Avatar component
 */
export default class Avatar extends BaseComponent {
  static displayName = 'Avatar';
  static propTypes = {
    /**
     * Background color for Avatar
     */
    backgroundColor: PropTypes.string,
    /**
     * Additional spacing styles for the container
     */
    containerStyle: PropTypes.object,
    /**
     * The image source (external or assets)
     */
    imageSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    /**
     * Label that can represent initials
     */
    label: PropTypes.string,
    /**
     * The label color
     */
    labelColor: PropTypes.string,
    /**
     * Determine if to show online badge
     */
    isOnline: PropTypes.bool,
    /**
     * Custom size for the Avatar
     */
    size: PropTypes.number,
    /**
     * Use to identify the avatar in tests
     */
    testId: PropTypes.string,
  };

  static defaultProps = {
    backgroundColor: Colors.dark80,
    size: 50,
    labelColor: Colors.dark10,
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const {label, imageSource, isOnline, testId} = this.props;
    const containerStyle = this.extractContainerStyle(this.props);
    return (
      <View style={[this.styles.container, containerStyle]} testId={testId}>
        <View style={this.styles.initialsContainer}>
          <Text numberOfLines={1} style={this.styles.initials}>
            {label}
          </Text>
        </View>

        <Image style={this.styles.image} source={imageSource} />
        {isOnline &&
        <View style={this.styles.onlineBadge}>
          <View style={this.styles.onlineBadgeInner}/>
        </View>}
      </View>
    );
  }
}

function createStyles({size, backgroundColor, labelColor, imageSource}) {
  const borderRadius = size / 2;
  const fontSizeToImageSizeRatio = 0.32;
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      backgroundColor,
      borderRadius,
    },
    initialsContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    initials: {
      fontSize: size * fontSizeToImageSizeRatio,
      color: labelColor,
      backgroundColor: 'rgba(0,0,0,0)',
    },
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
      backgroundColor: imageSource ? Colors.white : 'transparent',
      position: 'absolute',
      right: imageSource ? -1.5 : 0,
      top: 4.5,
    },
    onlineBadgeInner: {
      flex: 1,
      borderRadius: 999,
      backgroundColor: Colors.green30,
    },
    fixAbsolutePosition: {
      position: undefined,
      left: undefined,
      bottom: undefined,
    },
  });

  return styles;
}
