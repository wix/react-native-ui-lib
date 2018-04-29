import React from 'react';
import {Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import Colors from '../../style/colors';
import {BaseComponent} from '../../commons';
import {Typography, ThemeManager, BorderRadiuses} from '../../style';

/**
 * @description: Round colored badge, typically used to show a number
 * @extends: Animatable.View
 * @extendslink: https://github.com/oblador/react-native-animatable
 * @image: https://user-images.githubusercontent.com/33805983/34480753-df7a868a-efb6-11e7-9072-80f5c110a4f3.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/BadgesScreen.js
 */
export default class Badge extends BaseComponent {
  static displayName = 'Badge';
  static propTypes = {
    /**
     * Text to show inside the badge
     */
    label: PropTypes.string,
    /**
     * Color of the badge background
     */
    backgroundColor: PropTypes.string,
    /**
     * the badge size (default, small)
     */
    size: PropTypes.oneOf(['default', 'small']),
    /**
     * width of border around the badge
     */
    borderWidth: PropTypes.number,
    /**
     * color of border around the badge
     */
    borderColor: PropTypes.string,
    /**
     * Additional styles for the top container
     */
    containerStyle: PropTypes.object,
    /**
     * Use to identify the badge in tests
     */
    testId: PropTypes.string,
  };

  static defaultProps = {
    size: 'default',
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  getBadgeSizeStyle() {
    const {label, size, borderWidth} = this.props;
    const isOneLetter = label.length < 2;
    const isSmallBadge = size === 'small';
    let width = isSmallBadge ? (isOneLetter ? 18 : 25) : (isOneLetter ? 21 : 30);
    let height = isSmallBadge ? 18 : 21;
    if (borderWidth) {
      width += borderWidth * 2;
      height += borderWidth * 2;
    }

    return {width, height};
  }

  render() {
    const {size, borderWidth, borderColor} = this.props;
    const containerStyle = this.extractContainerStyle(this.props);
    const backgroundStyle = this.props.backgroundColor && {backgroundColor: this.props.backgroundColor};
    const animationProps = this.extractAnimationProps();
    const isSmallBadge = size === 'small';
    const sizeStyle = this.getBadgeSizeStyle();

    return (
      <Animatable.View
        testID={this.props.testId}
        style={[
          sizeStyle,
          this.styles.badge,
          borderWidth && {borderWidth},
          borderColor && {borderColor},
          containerStyle,
          backgroundStyle,
        ]}
        {...animationProps}
      >
        <Text
          style={[this.styles.label, isSmallBadge && this.styles.labelSmall]}
          allowFontScaling={false}
          numberOfLines={1}
          testID="badge"
        >
          {this.props.label}
        </Text>
      </Animatable.View>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    badge: {
      borderRadius: BorderRadiuses.br100,
      backgroundColor: ThemeManager.primaryColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
    badgeSmall: {
      height: 18,
    },
    label: {
      ...Typography.text90,
      color: Colors.white,
      backgroundColor: 'transparent',
    },
    labelSmall: {
      ...Typography.text100,
      lineHeight: undefined,
    },
  });
}
