import React from 'react';
import {Text, StyleSheet, Animated} from 'react-native';
import Colors from '../../style/colors';
import {AnimatedComponent} from '../../commons';
import {Typography, ThemeManager} from '../../style';

/**
 * Round colored badge, typically used to show a number
 */
export default class Badge extends AnimatedComponent {
  static displayName = 'Badge';
  static propTypes = {
    /**
     * Text to show inside the badge
     */
    label: React.PropTypes.string,
    /**
     * Color of the badge background
     */
    backgroundColor: React.PropTypes.string,
    /**
     * Additional styles for the top container
     */
    containerStyle: React.PropTypes.object,
    /**
     * Use to identify the badge in tests
     */
    testId: React.PropTypes.string,
    ...AnimatedComponent.propTypes,
  };

  generateStyles() {
    this.styles = createStyles();
  }

  render() {
    const containerStyle = this.extractContainerStyle(this.props);
    const backgroundStyle = this.props.backgroundColor && {backgroundColor: this.props.backgroundColor};
    const animatedStyle = this.getAnimationStyle();
    return (
      <Animated.View
        testID={this.props.testId}
        style={[this.styles.badge, containerStyle, backgroundStyle, animatedStyle]}
      >
        <Text
          style={this.styles.count}
          allowFontScaling={false}
          numberOfLines={1}
          testID="badge"
        >
          {this.props.label}
        </Text>
      </Animated.View>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    badge: {
      width: 21,
      height: 21,
      borderRadius: 12,
      backgroundColor: ThemeManager.primaryColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
    count: {
      ...Typography.text90,
      color: Colors.white,
      backgroundColor: 'rgba(0,0,0,0)',
    },
  });
}
