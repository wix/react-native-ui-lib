import _pt from "prop-types";
import _ from 'lodash';
import React, { PureComponent } from 'react';
import { StyleSheet, Text } from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';
import { extractAccessibilityProps, extractAnimationProps } from "../../commons/modifiers";
import { asBaseComponent } from "../../commons/new";
import { BorderRadiuses, Colors, Spacings, Typography } from "../../style";
import TouchableOpacity from "../touchableOpacity";
import Image from "../image";
import View from "../view";
const LABEL_FORMATTER_VALUES = [1, 2, 3, 4]; // TODO: depreciate enum badge sizes, use only number for size

export let BADGE_SIZES;

(function (BADGE_SIZES) {
  BADGE_SIZES[BADGE_SIZES["pimpleSmall"] = 6] = "pimpleSmall";
  BADGE_SIZES[BADGE_SIZES["pimpleBig"] = 10] = "pimpleBig";
  BADGE_SIZES[BADGE_SIZES["pimpleHuge"] = 14] = "pimpleHuge";
  BADGE_SIZES[BADGE_SIZES["small"] = 16] = "small";
  BADGE_SIZES[BADGE_SIZES["default"] = 20] = "default";
  BADGE_SIZES[BADGE_SIZES["large"] = 24] = "large";
})(BADGE_SIZES || (BADGE_SIZES = {}));

/**
 * @description: Round colored badge, typically used to show a number
 * @extends: Animatable.View
 * @extendsLink: https://github.com/oblador/react-native-animatable
 * @image: https://user-images.githubusercontent.com/33805983/34480753-df7a868a-efb6-11e7-9072-80f5c110a4f3.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/BadgesScreen.tsx
 */
class Badge extends PureComponent {
  static propTypes = {
    /**
         * Text to show inside the badge.
         * Not passing a label (undefined) will present a pimple badge.
         */
    label: _pt.string,

    /**
         * Color of the badge background
         */
    backgroundColor: _pt.string,

    /**
         * the badge size (default, small)
         */
    size: _pt.oneOfType([_pt.any, _pt.number]),

    /**
         * Press handler
         */
    onPress: _pt.func,

    /**
         * width of border around the badge
         */
    borderWidth: _pt.number,

    /**
         * radius of border around the badge
         */
    borderRadius: _pt.number,

    /**
         * Additional styling to badge icon
         */
    iconStyle: _pt.object,

    /**
         * Additional props passed to icon
         */
    iconProps: _pt.object,

    /**
         * Custom element to render instead of an icon
         */
    customElement: _pt.element,

    /**
         * Use to identify the badge in tests
         */
    testId: _pt.string
  };
  static displayName = 'Badge';

  constructor(props) {
    super(props);
    this.styles = createStyles(props);

    if (props.testId) {
      console.warn('Badge prop \'testId\' is deprecated. Please use RN \'testID\' prop instead.');
    }
  }

  get size() {
    return this.props.size || 'default';
  }

  getAccessibilityProps() {
    const {
      onPress,
      icon,
      label
    } = this.props;
    return {
      accessibilityLabel: icon ? 'badge' : label ? `${label} new items` : undefined,
      ...extractAccessibilityProps(this.props),
      accessible: !_.isUndefined(label),
      accessibilityRole: onPress ? 'button' : icon ? 'image' : 'text'
    };
  }

  isSmallBadge() {
    return this.size === 'small';
  }

  getBadgeSizeStyle() {
    const {
      borderWidth,
      icon,
      customElement
    } = this.props;
    const label = this.getFormattedLabel();
    const badgeHeight = _.isNumber(this.size) ? this.size : BADGE_SIZES[this.size];
    const style = {
      paddingHorizontal: this.isSmallBadge() ? 4 : 6,
      height: badgeHeight,
      minWidth: badgeHeight
    };

    if (icon && label) {
      style.paddingRight = 6;
      style.paddingLeft = 4;
      style.height = Spacings.s5;

      if (borderWidth) {
        style.height += borderWidth * 2;
      }

      return style;
    }

    if (customElement) {
      return style;
    }

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
    const {
      labelFormatterLimit,
      label
    } = this.props;

    if (_.isNaN(label)) {
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
    const {
      borderWidth,
      borderColor,
      borderRadius
    } = this.props;
    const style = {};

    if (borderWidth) {
      style.borderWidth = borderWidth;
      style.borderColor = borderColor;
    }

    if (borderRadius) {
      style.borderRadius = borderRadius;
    }

    return style;
  }

  renderLabel() {
    const {
      labelStyle,
      label
    } = this.props;

    if (label) {
      return <Text style={[this.styles.label, this.isSmallBadge() && this.styles.labelSmall, labelStyle]} allowFontScaling={false} numberOfLines={1} testID="badge">
          {this.getFormattedLabel()}
        </Text>;
    }
  }

  renderCustomElement() {
    const {
      customElement
    } = this.props;
    return customElement;
  }

  renderIcon() {
    const {
      icon,
      iconStyle,
      iconProps,
      borderColor,
      label
    } = this.props;
    const flex = label ? 0 : 1;
    return icon && <Image source={icon} resizeMode="contain" //@ts-ignore
    borderColor={borderColor} {...iconProps} style={{
      flex,
      ...iconStyle
    }} />;
  }

  render() {
    // TODO: remove testId after deprecation
    const {
      activeOpacity,
      backgroundColor,
      containerStyle,
      hitSlop,
      onPress,
      testId,
      testID,
      ...others
    } = this.props;
    const backgroundStyle = backgroundColor && {
      backgroundColor
    };
    const sizeStyle = this.getBadgeSizeStyle();
    const borderStyle = this.getBorderStyling();
    const animationProps = extractAnimationProps();
    const Container = !_.isEmpty(animationProps) ? AnimatableView : onPress ? TouchableOpacity : View;

    if (!_.isEmpty(animationProps)) {
      console.warn('Badge component will soon stop supporting animationProps.' + 'Please wrap your Badge component with your own animation component, such as Animatable.View');
    }

    return (// The extra View wrapper is to break badge's flex-ness
      // @ts-ignore
      <View style={containerStyle} {...others} backgroundColor={undefined} // @ts-expect-error
      borderWidth={undefined} {...this.getAccessibilityProps()}>
        <Container testID={testID || testId} pointerEvents={'none'} style={[sizeStyle, this.styles.badge, borderStyle, backgroundStyle]} onPress={onPress} activeOpacity={activeOpacity} hitSlop={hitSlop} {...animationProps} row>
          {this.renderCustomElement()}
          {this.renderIcon()}
          {this.renderLabel()}
        </Container>
      </View>
    );
  }

}

function createStyles(props) {
  const styles = StyleSheet.create({
    badge: {
      alignSelf: 'flex-start',
      borderRadius: BorderRadiuses.br100,
      backgroundColor: !props.icon || props.customElement ? Colors.primary : undefined,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    },
    label: { ...Typography.text90,
      color: Colors.white,
      backgroundColor: 'transparent'
    },
    labelSmall: { ...Typography.text100,
      lineHeight: undefined
    }
  });
  return styles;
}

export { Badge }; // For tests

export default asBaseComponent(Badge);