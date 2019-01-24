import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {View as AnimatableView} from 'react-native-animatable';
import {Colors, Typography, ThemeManager, BorderRadiuses} from '../../style';
import {BaseComponent} from '../../commons';
import View from '../view';

const SIZE_PIMPLE_SMALL = 6;
const SIZE_PIMPLE_BIG = 10;
const DEFAULT_HEIGHT_SMALL = 16;
const DEFAULT_HEIGHT = 20;
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

  constructor(props) {
    super(props);

    if (props.testId) {
      console.warn("Badge prop 'testId' is deprecated. Please use RN 'testID' prop instead.");
    }
  }

  isSmallBadge() {
    const {size} = this.props;
    return size === 'small';
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  getBadgeSizeStyle() {
    const {borderWidth, size} = this.props;
    const label = this.getFormattedLabel();
    const badgeHeight = this.isSmallBadge() ? DEFAULT_HEIGHT_SMALL : DEFAULT_HEIGHT;

    const style = {
      paddingHorizontal: this.isSmallBadge() ? 4 : 6,
      height: badgeHeight,
      minWidth: badgeHeight,
    };

    if (label === undefined) {
      switch (size) {
        case 'pimpleBig':
          style.minWidth = SIZE_PIMPLE_BIG;
          style.height = SIZE_PIMPLE_BIG;
          style.paddingHorizontal = 0;
          break;
        case 'pimpleSmall':
        default:
          style.minWidth = SIZE_PIMPLE_SMALL;
          style.height = SIZE_PIMPLE_SMALL;
          style.paddingHorizontal = 0;
          break;
      }
    }

    if (borderWidth) {
      style.minWidth += borderWidth * 2;
      style.height += borderWidth * 2;
    }
    return style;
  }

  getFormattedLabel() {
    const {labelFormatterLimit, label} = this.getThemeProps();
    if (isNaN(label)) {
      return label;
    }
    if (LABEL_FORMATTER_VALUES.includes(labelFormatterLimit)) {
      const maxLabelNumber = 10 ** labelFormatterLimit - 1;
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
    // TODO: remove testId after deprecation
    const {borderWidth, borderColor, testId, testID} = this.props;
    const containerStyle = this.extractContainerStyle(this.props);
    const backgroundStyle = this.props.backgroundColor && {backgroundColor: this.props.backgroundColor};
    const sizeStyle = this.getBadgeSizeStyle();

    const animationProps = this.extractAnimationProps();
    const Container = !_.isEmpty(animationProps) ? AnimatableView : View;
    if (!_.isEmpty(animationProps)) {
      console.warn(
        'Badge component will soon stop supporting animationProps.' +
          'Please wrap your Badge component with your own animation component, such as Animatable.View',
      );
    }

    return (
      <Container
        testID={testID || testId}
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
      </Container>
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
