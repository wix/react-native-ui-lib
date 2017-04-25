import React, {PropTypes} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import _ from 'lodash';
import {Constants} from '../../helpers';
import {BaseComponent} from '../../commons';
import Text from '../text';
import {Colors, Typography, ThemeManager, BorderRadiuses} from '../../style';

/**
 * Basic button component
 */
export default class Button extends BaseComponent {
  static displayName = 'Button';
  static propTypes = {
    ...Text.propTypes,
    /**
     * Text to show inside the button
     */
    label: PropTypes.string,
    /**
     * Icon image source
     */
    iconSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    /**
     * Icon image style
     */
    iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * Color of the button background
     */
    backgroundColor: PropTypes.string,
    /**
     * Size of the button [large, medium, small]
     */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * Custom border radius.
     */
    borderRadius: PropTypes.number,
    /**
     * Actions handler
     */
    onPress: PropTypes.func,
    /**
     * Disable interactions for the component
     */
    disabled: PropTypes.bool,
    /**
     * Button will have outline style
     */
    outline: PropTypes.bool,
    /**
     * The outline color
     */
    outlineColor: PropTypes.string,
    /**
     * Button will look like a link
     */
    link: PropTypes.bool,
    /**
     * Additional styles for the top container
     */
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * Additional styles for label text
     */
    labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * Control shadow visibility
     */
    enableShadow: PropTypes.bool, // iOS-only
    /**
     * Use to identify the button in tests
     */
    testID: PropTypes.string,
  };

  static defaultProps = {
    containerStyle: {},
    labelStyle: {},
    size: 'large',
    outline: false,
  };

  static sizes = {
    small: 'small',
    medium: 'medium',
    large: 'large',
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  getBackgroundColor() {
    const {disabled, outline, link, backgroundColor: propsBackgroundColor} = this.props;
    const {backgroundColor: stateBackgroundColor} = this.state;

    if (!outline && !link) {
      if (disabled) {
        return ThemeManager.CTADisabledColor;
      }

      return propsBackgroundColor || stateBackgroundColor;
    }
    return 'transparent';
  }

  getLabelColor() {
    const {link, outline, disabled} = this.props;

    let color = ThemeManager.CTATextColor;
    if (link || outline) {
      color = Colors.dark10;

      if (disabled) {
        return ThemeManager.CTADisabledColor;
      }
    }

    color = this.props.color || this.extractColorValue() || color;
    return color;
  }

  getLabelSizeStyle() {
    const {size, link} = this.props;
    let style = {
      paddingHorizontal: 36,
    };

    if (size === 'small') {
      style = {
        paddingHorizontal: 15,
        ...Typography.text80,
      };
    } else if (size === 'medium') {
      style = {
        paddingHorizontal: 24,
        ...Typography.text80,
      };
    }

    if (link) {
      style.paddingHorizontal = 0;
    }

    return style;
  }

  getContainerSizeStyle() {
    const {size} = this.props;
    let style = {
      paddingVertical: 16,
      minWidth: 138,
    };

    if (size === 'small') {
      style = {
        paddingVertical: 5,
        minWidth: 74,
      };
    } else if (size === 'medium') {
      style = {
        paddingVertical: 11,
        minWidth: 125,
      };
    }

    return style;
  }

  getOutlineStyle() {
    const {outline, outlineColor, link} = this.props;
    if ((outline || outlineColor) && !link) {
      return {
        borderWidth: 1,
        borderColor: outlineColor || Colors.dark70,
      };
    }
    return undefined;
  }

  getBorderRadiusStyle() {
    const {link, borderRadius} = this.props;
    if (link) {
      return {borderRadius: 0};
    } else if (!_.isUndefined(borderRadius)) {
      return {borderRadius};
    }
  }

  renderIcon() {
    const {iconSource, iconStyle, label, link, disabled} = this.props;
    if (iconSource) {
      return (
        <Image
          source={iconSource}
          style={[
            this.styles.icon,
            (link && disabled) && this.styles.iconDisabled,
            label && this.styles.iconSpacing,
            iconStyle,
          ]}
        />);
    }
    return null;
  }

  renderLabel() {
    const {label, labelStyle} = this.props;
    const sizeStyle = this.getLabelSizeStyle();
    const typography = this.extractTypographyValue();
    const color = this.getLabelColor();
    if (label) {
      return (
        <Text
          style={[
            this.styles.text,
            color && {color},
            sizeStyle,
            {...typography},
            labelStyle,
          ]}
          numberOfLines={1}
        >
          {Constants.isAndroid ? _.toUpper(label) : label}
        </Text>
      );
    }
    return null;
  }

  render() {
    const {onPress, disabled, link, enableShadow, style, testID} = this.props;
    const containerStyle = this.extractContainerStyle(this.props);
    const shadowStyle = enableShadow ? this.styles.shadowStyle : {};
    const {margins} = this.state;
    const backgroundColor = this.getBackgroundColor();
    const outlineStyle = this.getOutlineStyle();
    const containerSizeStyle = this.getContainerSizeStyle();
    const borderRadiusStyle = this.getBorderRadiusStyle();

    return (
      <TouchableOpacity
        style={[
          this.styles.container,
          shadowStyle,
          margins,
          containerStyle]}
        activeOpacity={0.6}
        onPress={onPress}
        disabled={disabled}
        testID={testID}
      >
        <View
          style={[
            this.styles.innerContainer,
            containerSizeStyle,
            backgroundColor && {backgroundColor},
            borderRadiusStyle,
            outlineStyle,
            disabled && this.styles.innerContainerDisabled,
            link && this.styles.innerContainerLink,
            style,
          ]}
        >
          {this.props.children}
          {this.renderIcon()}
          {this.renderLabel()}
        </View>
      </TouchableOpacity>
    );
  }
}

function createStyles({outline, outlineColor, link, color}) {
  const showBorder = outline && !link;
  return StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
    },
    innerContainer: {
      backgroundColor: ThemeManager.CTABackgroundColor,
      borderWidth: showBorder ? 1 : 0,
      borderColor: showBorder ? outlineColor : undefined,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: Constants.isIOS ? BorderRadiuses.br100 : BorderRadiuses.br10,
    },
    innerContainerDisabled: {
      backgroundColor: Colors.dark60,
    },
    innerContainerLink: {
      minWidth: undefined,
      paddingHorizontal: undefined,
      paddingVertical: undefined,
      borderRadius: BorderRadiuses.br0,
      backgroundColor: undefined,
    },
    shadowStyle: {
      shadowColor: '#3082C8',
      shadowOffset: {height: 5, width: 0},
      shadowOpacity: 0.35,
      shadowRadius: 9.5,
    },
    text: {
      backgroundColor: 'transparent',
      flex: 0,
      flexDirection: 'row',
      ...Typography.text70,
      fontWeight: '100',
    },
    icon: {
      width: 18,
      resizeMode: 'contain',
      tintColor: color,
    },
    iconDisabled: {
      tintColor: Colors.dark60,
    },
    iconSpacing: {
      marginRight: 7,
      marginBottom: 2,
      paddingRight: 0,
    },
  });
}
