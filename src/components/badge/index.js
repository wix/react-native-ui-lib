import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Text, ViewPropTypes} from 'react-native';
import {View as AnimatableView} from 'react-native-animatable';
import {PureBaseComponent} from '../../commons';
import {BorderRadiuses, Colors, ThemeManager, Typography} from '../../style';
import Image from '../image';
import TouchableOpacity from '../touchableOpacity';
import View from '../view';

const LABEL_FORMATTER_VALUES = [1, 2, 3, 4];

// TODO: depreciate enum badge sizes, use only number for size
export const BADGE_SIZES = {
  pimpleSmall: 6,
  pimpleBig: 10,
  pimpleHuge: 14,
  small: 16,
  default: 20,
  large: 24
};

/**
 * @description: Round colored badge, typically used to show a number
 * @extends: Animatable.View
 * @extendslink: https://github.com/oblador/react-native-animatable
 * @image: https://user-images.githubusercontent.com/33805983/34480753-df7a868a-efb6-11e7-9072-80f5c110a4f3.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/BadgesScreen.js
 */
export default class Badge extends PureBaseComponent {
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
    size: PropTypes.oneOfType([PropTypes.oneOf(Object.keys(BADGE_SIZES)), PropTypes.number]),
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
    containerStyle: ViewPropTypes.style,
    /**
     * Additional styles for the badge label
     */
    labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * Receives a number from 1 to 4, representing the label's max digit length.
     * Beyond the max number for that digit length, a "+" will show at the end.
     * If set to a value not included in LABEL_FORMATTER_VALUES, no formating will occur.
     * Example: labelLengthFormater={2}, label={124}, label will present "99+".
     */
    labelFormatterLimit: PropTypes.oneOf(LABEL_FORMATTER_VALUES),
    /**
     * Renders an icon badge
     */
    icon: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    /**
     * Additional styling to badge icon
     */
    iconStyle: PropTypes.object,
    /**
     * Additional props passed to icon
     */
    iconProps: PropTypes.object,
    /**
     * Use to identify the badge in tests
     */
    testId: PropTypes.string
  };

  static defaultProps = {
    size: 'default'
  };

  constructor(props) {
    super(props);

    if (props.testId) {
      console.warn('Badge prop \'testId\' is deprecated. Please use RN \'testID\' prop instead.');
    }
  }

  getAccessibilityProps() {
    const {onPress, icon, label} = this.props;

    return {
      accessibilityLabel: icon ? 'badge' : label ? `${label} new items` : undefined,
      ...this.extractAccessibilityProps(),
      accessible: true,
      accessibilityRole: onPress ? 'button' : icon ? 'image' : 'text'
    };
  }

  isSmallBadge() {
    const {size} = this.props;
    return size === 'small';
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  getBadgeSizeStyle() {
    const {borderWidth, size, icon} = this.props;
    const label = this.getFormattedLabel();
    const badgeHeight = _.isNumber(size) ? size : BADGE_SIZES[size];

    const style = {
      paddingHorizontal: this.isSmallBadge() ? 4 : 6,
      height: badgeHeight,
      minWidth: badgeHeight
    };

    const isPimple = label === undefined;
    if (isPimple || icon) {
      style.paddingHorizontal = 0;
      style.minWidth = undefined;
      style.width = style.height;
      if (borderWidth) {
        style.height += borderWidth * 2;
        style.width += borderWidth * 2;
      }
      return style;
    }

    if (borderWidth) {
      style.height += borderWidth * 2;
      style.minWidth += borderWidth * 2;
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

  getBorderStyling() {
    const {borderWidth, borderColor} = this.props;
    return {
      borderWidth,
      borderColor
    };
  }

  renderLabel() {
    const {labelStyle} = this.props;
    return (
      <Text
        style={[this.styles.label, this.isSmallBadge() && this.styles.labelSmall, labelStyle]}
        allowFontScaling={false}
        numberOfLines={1}
        testID="badge"
      >
        {this.getFormattedLabel()}
      </Text>
    );
  }

  renderIcon() {
    const {icon, iconStyle, iconProps, borderColor} = this.props;
    return (
      <Image
        source={icon}
        resizeMode="contain"
        borderColor={borderColor}
        {...iconProps}
        style={{
          flex: 1,
          ...iconStyle
        }}
      />
    );
  }

  render() {
    // TODO: remove testId after deprecation
    const {
      activeOpacity,
      borderWidth,
      backgroundColor,
      containerStyle,
      icon,
      onPress,
      testId,
      testID,
      ...others
    } = this.props;
    const backgroundStyle = backgroundColor && {backgroundColor};
    const sizeStyle = this.getBadgeSizeStyle();
    const borderStyle = borderWidth ? this.getBorderStyling() : undefined;

    const animationProps = this.extractAnimationProps();
    const Container = !_.isEmpty(animationProps) ? AnimatableView : onPress ? TouchableOpacity : View;
    if (!_.isEmpty(animationProps)) {
      console.warn('Badge component will soon stop supporting animationProps.' +
          'Please wrap your Badge component with your own animation component, such as Animatable.View',);
    }
    return (
      // The extra View wrapper is to break badge's flex-ness
      <View style={containerStyle} {...others} backgroundColor={undefined} {...this.getAccessibilityProps()}>
        <Container
          testID={testID || testId}
          pointerEvents={'none'}
          style={[sizeStyle, this.styles.badge, borderStyle, backgroundStyle]}
          onPress={onPress}
          activeOpacity={activeOpacity}
          {...animationProps}
        >
          {icon ? this.renderIcon() : this.renderLabel()}
        </Container>
      </View>
    );
  }
}

function createStyles(props) {
  return StyleSheet.create({
    badge: {
      alignSelf: 'flex-start',
      borderRadius: BorderRadiuses.br100,
      backgroundColor: !props.icon ? ThemeManager.primaryColor : undefined,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    },
    label: {
      ...Typography.text90,
      color: Colors.white,
      backgroundColor: 'transparent'
    },
    labelSmall: {
      ...Typography.text100,
      lineHeight: undefined
    }
  });
}
