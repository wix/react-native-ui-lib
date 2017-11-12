import React from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet} from 'react-native';
import _ from 'lodash';
import {BaseComponent} from '../../commons';
import Text from '../text';
import TouchableOpacity from '../touchableOpacity';
import {Colors, Typography, ThemeManager, BorderRadiuses} from '../../style';
import View from '../view';

/**
 * @description: Basic button component
 * @modifiers: margins
 * @extends TouchableOpacity
 * @example https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ButtonsScreen.js
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
    size: PropTypes.oneOf(['xSmall', 'small', 'medium', 'large']),
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
     * label color for when it's displayed as link
     */
    linkColor: PropTypes.string,
    /**
     * Additional styles for label text
     */
    labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * should the button act as a coast to coast button (no border radius)
     */
    fullWidth: PropTypes.bool,
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
    labelStyle: {},
    size: 'large',
    outline: false,

    borderRadius: BorderRadiuses.br100,
    // backgroundColor: ThemeManager.CTABackgroundColor,
  };

  static sizes = {
    xSmall: 'xSmall',
    small: 'small',
    medium: 'medium',
    large: 'large',
  };

  constructor(props) {
    super(props);

    if (!_.isUndefined(props.containerStyle)) {
      console.warn('Button "containerStyle" prop will be deprecated soon, please use "style" instead');
    }
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  get isOutline() {
    const {outline, outlineColor} = this.getThemeProps();
    return Boolean(outline || outlineColor);
  }

  get isFilled() {
    const {link} = this.getThemeProps();
    return !this.isOutline && !link;
  }

  getBackgroundColor() {
    const {disabled, outline, link, backgroundColor: propsBackgroundColor} = this.getThemeProps();
    const {backgroundColor: stateBackgroundColor} = this.state;

    if (!outline && !link) {
      if (disabled) {
        return ThemeManager.CTADisabledColor;
      }

      return propsBackgroundColor || stateBackgroundColor || Colors.blue30;
    }
    return 'transparent';
  }

  getLabelColor() {
    const {link, linkColor, outline, disabled} = this.getThemeProps(); // this.props;

    let color = ThemeManager.CTATextColor;
    if (link) {
      color = linkColor || Colors.blue30;
    } else if (outline) {
      color = Colors.dark10;
    }

    if (disabled && (link || outline)) {
      return ThemeManager.CTADisabledColor;
    }

    color = this.props.color || this.extractColorValue() || color;
    return color;
  }

  getContentSizeStyle() {
    const {size, link} = this.props;

    const LABEL_STYLE_BY_SIZE = {};
    LABEL_STYLE_BY_SIZE[Button.sizes.xSmall] = {paddingHorizontal: 12};
    LABEL_STYLE_BY_SIZE[Button.sizes.small] = {paddingHorizontal: 15};
    LABEL_STYLE_BY_SIZE[Button.sizes.medium] = {paddingHorizontal: 24};
    LABEL_STYLE_BY_SIZE[Button.sizes.large] = {paddingHorizontal: 36};

    const labelSizeStyle = LABEL_STYLE_BY_SIZE[size];
    if (link) {
      labelSizeStyle.paddingHorizontal = 0;
    }

    return labelSizeStyle;
  }

  getLabelSizeStyle() {
    const {size} = this.props;

    const LABEL_STYLE_BY_SIZE = {};
    LABEL_STYLE_BY_SIZE[Button.sizes.xSmall] = {...Typography.text80};
    LABEL_STYLE_BY_SIZE[Button.sizes.small] = {...Typography.text80};
    LABEL_STYLE_BY_SIZE[Button.sizes.medium] = {...Typography.text80};
    LABEL_STYLE_BY_SIZE[Button.sizes.large] = {};

    const labelSizeStyle = LABEL_STYLE_BY_SIZE[size];
    return labelSizeStyle;
  }

  getContainerSizeStyle() {
    const {size, outline} = this.props;

    const CONTAINER_STYLE_BY_SIZE = {};
    CONTAINER_STYLE_BY_SIZE[Button.sizes.xSmall] = {paddingVertical: 4, minWidth: 60};
    CONTAINER_STYLE_BY_SIZE[Button.sizes.small] = {paddingVertical: 5, minWidth: 74};
    CONTAINER_STYLE_BY_SIZE[Button.sizes.medium] = {paddingVertical: 11, minWidth: 125};
    CONTAINER_STYLE_BY_SIZE[Button.sizes.large] = {paddingVertical: 16, minWidth: 138};

    if (outline) {
      _.forEach(CONTAINER_STYLE_BY_SIZE, (style) => {
        style.paddingVertical -= 1; // eslint-disable-line
      });
    }

    return CONTAINER_STYLE_BY_SIZE[size];
  }

  getOutlineStyle() {
    const {outline, outlineColor, link, disabled} = this.props;
    let outlineStyle;
    if ((outline || outlineColor) && !link) {
      outlineStyle = {
        borderWidth: 1,
        borderColor: outlineColor || Colors.blue30,
      };

      if (disabled) {
        outlineStyle.borderColor = Colors.dark70;
      }
    }
    return outlineStyle;
  }

  getBorderRadiusStyle() {
    const {link, borderRadius, fullWidth} = this.props;
    if (link || fullWidth) {
      return {borderRadius: 0};
    }
    return {borderRadius: _.isUndefined(borderRadius) ? BorderRadiuses.br100 : borderRadius};
  }

  getShadowStyle() {
    const backgroundColor = this.getBackgroundColor();
    const {enableShadow} = this.props;
    if (enableShadow) {
      return [this.styles.shadowStyle, backgroundColor && {shadowColor: backgroundColor}];
    }
  }

  renderIcon() {
    const {iconSource, iconStyle, label, disabled} = this.props;
    if (iconSource) {
      return (
        <Image
          source={iconSource}
          style={[
            this.styles.icon,
            !this.isFilled && disabled && this.styles.iconDisabled,
            label && this.styles.iconSpacing,
            iconStyle,
          ]}
        />
      );
    }
    return null;
  }

  renderLabel() {
    const {label, labelStyle} = this.props;
    const typography = this.extractTypographyValue();
    const color = this.getLabelColor();
    const labelSizeStyle = this.getLabelSizeStyle();
    if (label) {
      return (
        <Text
          style={[this.styles.text, color && {color}, labelSizeStyle, {...typography}, labelStyle]}
          numberOfLines={1}
        >
          {label}
        </Text>
      );
    }
    return null;
  }

  render() {
    const {onPress, disabled, link, style, containerStyle, testID, ...others} = this.getThemeProps();
    const shadowStyle = this.getShadowStyle();
    const {margins} = this.state;
    const backgroundColor = this.getBackgroundColor();
    const outlineStyle = this.getOutlineStyle();
    const containerSizeStyle = this.getContainerSizeStyle();
    const contentSizeStyle = this.getContentSizeStyle();
    const borderRadiusStyle = this.getBorderRadiusStyle();

    return (
      <TouchableOpacity
        style={[
          this.styles.container,
          this.styles.innerContainer,
          containerSizeStyle,
          link && this.styles.innerContainerLink,
          shadowStyle,
          margins,
          containerStyle,
          backgroundColor && {backgroundColor},
          borderRadiusStyle,
          outlineStyle,
          style,
        ]}
        activeOpacity={0.6}
        onPress={onPress}
        disabled={disabled}
        testID={testID}
        {...others}
      >
        <View row centerV style={contentSizeStyle}>
          {this.props.children}
          {this.renderIcon()}
          {this.renderLabel()}
        </View>
        {/* <View
          style={[
            this.styles.innerContainer,
            containerSizeStyle,
            link && this.styles.innerContainerLink,
            style,
          ]}
        >
        </View> */}
      </TouchableOpacity>
    );
  }
}

function createStyles({color}) {
  return StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
    },
    innerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerDisabled: {
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
      tintColor: color,
    },
    iconDisabled: {
      tintColor: Colors.dark60,
    },
    iconSpacing: {
      marginRight: 7,
      paddingRight: 0,
    },
  });
}
