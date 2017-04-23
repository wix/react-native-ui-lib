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
     * Custom border radius. can be a number or any of the BorderRadiuses constants
     */
    borderRadius: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(_.keys(BorderRadiuses)),
    ]),
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
    labelStyle: PropTypes.object,
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
    backgroundColor: ThemeManager.CTABackgroundColor,
    borderRadius: Constants.isIOS ? BorderRadiuses.br100 : BorderRadiuses.br10,
    size: 'large',
    outline: false,
    outlineColor: Colors.dark70,
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
      } else {
        return propsBackgroundColor || stateBackgroundColor;
      }
    }
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
            {backgroundColor},
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

function createStyles({borderRadius, outline, outlineColor, link, color, size}) {

  const containerStyleBySize = {
    large: {paddingVertical: 16, minWidth: 138},
    medium: {paddingVertical: 11, minWidth: 125},
    small: {paddingVertical: 5, minWidth: 74},
  };

  const customBorderRadius = _.isString(borderRadius) ? BorderRadiuses[borderRadius] : borderRadius;
  const showBorder = outline && !link;
  return StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
    },
    innerContainer: {
      borderWidth: showBorder ? 1 : 0,
      borderColor: showBorder ? outlineColor : undefined,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: customBorderRadius,
      ...containerStyleBySize[size],
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
