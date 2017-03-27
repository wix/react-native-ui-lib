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

  renderIcon() {
    const {iconSource, label} = this.props;
    if (iconSource) {
      return (
        <Image
          source={iconSource}
          style={[this.styles.icon, label && this.styles.iconSpacing]}
        />);
    }
    return null;
  }

  renderLabel() {
    const {label, labelStyle, testId} = this.props;
    const textProps = this.extractTextProps(this.props);
    if (label) {
      return (
        <Text {...textProps} style={[this.styles.text, labelStyle]} numberOfLines={1} testID={testId}>
          {Constants.isAndroid ? _.toUpper(label) : label}
        </Text>
      );
    }
    return null;
  }

  render() {
    const {onPress, disabled, link, enableShadow, style} = this.props;
    const containerStyle = this.extractContainerStyle(this.props);
    const shadowStyle = enableShadow ? this.styles.shadowStyle : {};

    return (
      <TouchableOpacity
        style={[
          this.styles.container,
          shadowStyle,
          containerStyle]}
        activeOpacity={0.6}
        onPress={onPress}
        disabled={disabled}
      >
        <View
          style={[
            this.styles.innerContainer,
            disabled && this.styles.disabled,
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

function createStyles({backgroundColor, borderRadius, outline, outlineColor, link, color, size}) {
  const textStyleBySize = {
    large: {paddingHorizontal: 36},
    medium: {paddingHorizontal: 24},
    small: {paddingHorizontal: 15},
  };

  const containerStyleBySize = {
    large: {paddingVertical: 16, minWidth: 158},
    medium: {paddingVertical: 11, minWidth: 125},
    small: {paddingVertical: 5, minWidth: 74},
  };

  const customBorderRadius = _.isString(borderRadius) ? BorderRadiuses[borderRadius] : borderRadius;
  const showBorder = outline && !link;
  const haveBackground = !outline && !link;
  return StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
    },
    innerContainer: {
      backgroundColor: haveBackground ? backgroundColor : undefined,
      borderWidth: showBorder ? 1 : 0,
      borderColor: showBorder ? outlineColor : undefined,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: customBorderRadius,
      ...containerStyleBySize[size],
    },
    innerContainerLink: {
      minWidth: undefined,
      paddingHorizontal: undefined,
      paddingVertical: undefined,
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
      color: (outline || link) ? Colors.dark10 : ThemeManager.CTATextColor,
      ...Typography.text70,
      fontWeight: '100',
      paddingHorizontal: link ? 0 : textStyleBySize[size].paddingHorizontal,
    },
    textSmall: {
      ...Typography.text80,
    },
    disabled: {
      backgroundColor: Colors.dark60,
    },
    icon: {
      width: 18,
      resizeMode: 'contain',
      tintColor: color,
    },
    iconSpacing: {
      marginRight: 7,
      marginBottom: 2,
      paddingRight: 0,
    },
  });
}
