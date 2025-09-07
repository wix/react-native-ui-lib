import _isNaN from "lodash/isNaN";
import _isUndefined from "lodash/isUndefined";
import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { extractAccessibilityProps } from "../../commons/modifiers";
import { asBaseComponent } from "../../commons/new";
import { BorderRadiuses, Colors, Spacings, Typography } from "../../style";
import TouchableOpacity from "../touchableOpacity";
import Image from "../image";
import View from "../view";
import Text from "../text";
const LABEL_FORMATTER_VALUES = [1, 2, 3, 4];
const DEFAULT_PIMPLE_SIZE = 10;
const DEFAULT_BADGE_SIZE = 20;
/**
 * @description: Round colored badge, typically used to show a number
 * @extends: View
 * @image: https://user-images.githubusercontent.com/33805983/34480753-df7a868a-efb6-11e7-9072-80f5c110a4f3.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/BadgesScreen.tsx
 */
class Badge extends PureComponent {
  static displayName = 'Badge';
  constructor(props) {
    super(props);
    this.styles = createStyles(props);
  }
  getAccessibilityProps() {
    const {
      onPress,
      icon,
      label,
      accessibilityLabel
    } = this.props;
    return {
      accessibilityLabel: accessibilityLabel || label ? `${label} new items` : 'badge',
      ...extractAccessibilityProps(this.props),
      accessible: !_isUndefined(label),
      accessibilityRole: onPress ? 'button' : icon ? 'image' : 'text'
    };
  }
  get size() {
    const {
      size,
      label
    } = this.props;
    if (size !== undefined) {
      return size;
    }
    return label === undefined ? DEFAULT_PIMPLE_SIZE : DEFAULT_BADGE_SIZE;
  }
  isSmallBadge() {
    return this.size <= 16;
  }
  getBadgeSizeStyle() {
    const {
      borderWidth,
      icon,
      customElement
    } = this.props;
    const label = this.getFormattedLabel();
    const style = {
      paddingHorizontal: this.isSmallBadge() ? 4 : 6,
      height: this.size,
      minWidth: this.size
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
    if (_isNaN(label)) {
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
      return <Text style={[this.styles.label, this.isSmallBadge() && this.styles.labelSmall, labelStyle]} allowFontScaling={false} numberOfLines={1} testID="badge" recorderTag={'unmask'}>
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
    return icon && <Image source={icon} resizeMode="contain" tintColor={Colors.$iconDefaultLight}
    //@ts-ignore
    borderColor={borderColor} {...iconProps} style={{
      flex,
      ...iconStyle
    }} />;
  }
  render() {
    const {
      activeOpacity,
      backgroundColor,
      containerStyle,
      hitSlop,
      onPress,
      testID,
      ...others
    } = this.props;
    const backgroundStyle = backgroundColor && {
      backgroundColor
    };
    const sizeStyle = this.getBadgeSizeStyle();
    const borderStyle = this.getBorderStyling();
    const Container = onPress ? TouchableOpacity : View;
    return (
      // The extra View wrapper is to break badge's flex-ness
      // @ts-ignore
      <View style={containerStyle} {...others} backgroundColor={undefined}
      // @ts-expect-error
      borderWidth={undefined} {...this.getAccessibilityProps()}>
        <Container testID={testID} pointerEvents={'none'} style={[sizeStyle, this.styles.badge, borderStyle, backgroundStyle]} onPress={onPress} activeOpacity={activeOpacity} hitSlop={hitSlop} row>
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
      backgroundColor: !props.icon || props.customElement ? Colors.$backgroundGeneralHeavy : undefined,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    },
    label: {
      ...Typography.text90,
      color: Colors.$textDefaultLight,
      backgroundColor: 'transparent'
    },
    labelSmall: {
      ...Typography.text100,
      lineHeight: undefined
    }
  });
  return styles;
}
export { Badge }; // For tests

export default asBaseComponent(Badge);