import React, {PropTypes} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import _ from 'lodash';
import {Constants} from '../../helpers';
import {BaseComponent} from '../../commons';
import {Colors, Typography, ThemeManager, BorderRadiuses} from '../../style';

/**
 * Basic button component
 */
export default class Button extends BaseComponent {
  static displayName = 'Button';
  static propTypes = {
    /**
     * Text to show inside the button
     */
    label: PropTypes.string,
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
     * Additional styles for the top container
     */
    containerStyle: PropTypes.object,
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
    testId: PropTypes.string,
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

  getSizeStyle() {
    const {size} = this.props;
    if (size === Button.sizes.small) {
      return this.styles.small;
    } else if (size === Button.sizes.medium) {
      return this.styles.medium;
    }
    return null;
  }

  getTextStyle() {
    const {size} = this.props;
    if (size !== Button.sizes.large) {
      return this.styles.textSmall;
    }
    return null;
  }

  render() {
    const {label, onPress, disabled, labelStyle, enableShadow, testId} = this.props;
    const sizeStyle = this.getSizeStyle();
    const containerStyle = this.extractContainerStyle(this.props);
    const shadowStyle = enableShadow ? this.styles.shadowStyle : {};
    const textStyle = this.getTextStyle();
    return (
      <TouchableOpacity
        style={[this.styles.container, sizeStyle, shadowStyle, disabled && this.styles.disabled, containerStyle]}
        activeOpacity={0.6}
        onPress={onPress}
        disabled={disabled}
      >
        <View style={this.styles.innerContainer}>
          <Text style={[this.styles.text, textStyle, labelStyle]} numberOfLines={1} testID={testId}>
            {Constants.isAndroid ? _.toUpper(label) : label}
          </Text>
          {this.props.children}
        </View>
      </TouchableOpacity>
    );
  }
}

function createStyles({backgroundColor, borderRadius, outline, outlineColor}) {
  const customBorderRadius = _.isString(borderRadius) ? BorderRadiuses[borderRadius] : borderRadius;
  return StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
    },
    innerContainer: {
      backgroundColor: outline ? undefined : backgroundColor,
      borderWidth: outline ? 1 : 0,
      borderColor: outline ? outlineColor : undefined,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: customBorderRadius,
      paddingHorizontal: 36,
      paddingVertical: 16,
      minWidth: 150,
    },
    medium: {
      paddingHorizontal: 24,
      paddingVertical: 11,
      minWidth: 125,
    },
    small: {
      paddingHorizontal: 15,
      paddingVertical: 5,
      minWidth: 74,
    },
    shadowStyle: {
      shadowColor: '#3082C8',
      shadowOffset: {height: 5, width: 0},
      shadowOpacity: 0.35,
      shadowRadius: 9.5,
    },
    text: {
      flex: 0,
      flexDirection: 'row',
      color: outline ? Colors.dark10 : ThemeManager.CTATextColor,
      ...Typography.text70,
      fontWeight: '100',
    },
    textSmall: {
      ...Typography.text80,
    },
    disabled: {
      backgroundColor: Colors.dark60,
    },
  });
}
