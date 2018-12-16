import React from 'react';
import {Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import Colors from '../../style/colors';
import {BaseComponent} from '../../commons';
import {Typography, ThemeManager, BorderRadiuses} from '../../style';
import _ from 'lodash';

const SIZE_PIMPLE_SMALL = 6;
const SIZE_PIMPLE_BIG = 10;
const SIZE_DEFAULT = 20;
const WIDTH_DOUBLE = 28;
const WIDTH_TRIPLE = 36;

const SIZE_SMALL = 16;
const WIDTH_DOUBLE_SMALL = 25;
const WIDTH_TRIPLE_SMALL = 30;

const LABEL_FORMATTER_VALUES = [1, 2, 3, 4];

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
     * Text to show inside the badge.
     * Not passing a label (undefined) will present a pimple badge.
     */
    label: PropTypes.string,
    /**
     * Color of the badge background
     */
    backgroundColor: PropTypes.string,
    /**
     * the badge size (default, small)
     */
    size: PropTypes.oneOf(['default', 'small', 'pimpleBig', 'pimpleSmall']),
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
     * Receives a number from 1 to 4, representing the label's max digit length.
     * Beyond the max number for that digit length, a "+" will show at the end.
     * If set to a value not included in LABEL_FORMATTER_VALUES, no formating will occur.
     * Example: labelLengthFormater={2}, label={124}, label will present "99+".
     */
    labelFormatterLimit: PropTypes.oneOf(LABEL_FORMATTER_VALUES),
    /**
     * Use to identify the badge in tests
     */
    testId: PropTypes.string,
  };

  static defaultProps = {
    size: 'default',
  };

  isSmallBadge() {
    const {size} = this.props;
    return size === 'small';
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  getBadgeSizeStyle() {
    const {label, borderWidth, size} = this.props;
    let height = this.isSmallBadge() ? SIZE_SMALL : SIZE_DEFAULT;
    let width = 0;
    if (label === undefined) {
      switch (size) {
        default:
        case 'pimpleSmall':
          width = SIZE_PIMPLE_SMALL;
          height = SIZE_PIMPLE_SMALL;
          break;
        case 'pimpleBig':
          width = SIZE_PIMPLE_BIG;
          height = SIZE_PIMPLE_BIG;
      }
    } else {
      const numberOfCharacters = label.length;
      switch (numberOfCharacters) {
        case 0:
        case 1:
          width = this.isSmallBadge() ? SIZE_SMALL : SIZE_DEFAULT;
          break;
        case 2:
          width = this.isSmallBadge() ? WIDTH_DOUBLE_SMALL : WIDTH_DOUBLE;
          break;
        default:
          width = this.isSmallBadge() ? WIDTH_TRIPLE_SMALL : WIDTH_TRIPLE;
          break;
      }
    }

    if (borderWidth) {
      width += borderWidth * 2;
      height += borderWidth * 2;
    }
    return {width, height};
  }

  getFormattedLabel() {
    const {labelFormatterLimit, label} = this.getThemeProps();
    if (isNaN(label)) {
      return label;
    }
    if (LABEL_FORMATTER_VALUES.includes(labelFormatterLimit)) {
      const maxLabelNumber = (10 ** labelFormatterLimit) - 1;
      let formattedLabel = label;
      if (formattedLabel > maxLabelNumber) {
        formattedLabel = `${maxLabelNumber}+`;
      }
      return formattedLabel;
    } else {
      return label;
    }
  }

  renderLabel() {
    return (
      <Text
        style={[this.styles.label, this.isSmallBadge() && this.styles.labelSmall]}
        allowFontScaling={false}
        numberOfLines={1}
        testID="badge"
      >
        {this.getFormattedLabel()}
      </Text>
    );
  }

  render() {
    const {borderWidth, borderColor} = this.props;
    const containerStyle = this.extractContainerStyle(this.props);
    const backgroundStyle = this.props.backgroundColor && {backgroundColor: this.props.backgroundColor};
    const animationProps = this.extractAnimationProps();
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
        {this.renderLabel()}
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
