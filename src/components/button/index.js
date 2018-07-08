import React from 'react';
import PropTypes from 'prop-types';
import {Platform, Image, StyleSheet} from 'react-native';
import _ from 'lodash';
import {BaseComponent} from '../../commons';
import {Constants} from '../../helpers';
import Text from '../text';
import TouchableOpacity from '../touchableOpacity';
import {Colors, Typography, ThemeManager, BorderRadiuses} from '../../style';
import View from '../view';

/**
 * @description: Basic button component
 * @extends: TouchableOpacity
 * @extendslink: docs/TouchableOpacity
 * @modifiers: margin, background
 * @gif: https://media.giphy.com/media/xULW8j5WzsuPytqklq/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ButtonsScreen.js
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
     * The Button text color (inherited from Text component)
     */
    color: PropTypes.string,
    /**
     * Icon image source
     */
    iconSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    /**
     * Icon image style
     */
    iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * Should the icon be right to the label
     */
    iconOnRight: PropTypes.bool,
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
     * The outline width
     */
    outlineWidth: PropTypes.number,
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
     * Props that will be passed to the button's Text label.
     */
    labelProps: PropTypes.object,
    /**
     * avoid inner button padding
     */
    avoidInnerPadding: PropTypes.bool,
    /**
     * avoid minimum width constraints
     */
    avoidMinWidth: PropTypes.bool,
    /**
     * callback for getting activeBackgroundColor (e.g. (calculatedBackgroundColor, prop) => {...})
     * better set using ThemeManager
     */
    getActiveBackgroundColor: PropTypes.func,
    /**
     * Use to identify the button in tests
     */
    testID: PropTypes.string,
  };

  static defaultProps = {
    labelStyle: {},
    size: 'large',
    outline: false,
    iconOnRight: false,
    // borderRadius: BorderRadiuses.br100,
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
      console.error('Button "containerStyle" prop will be deprecated soon, please use "style" instead');
    }
  }

  // This method will be called more than once in case of layout change!
  getComponentDimensions(event) {
    if (Constants.isAndroid && Platform.Version <= 17) {
      const height = event.nativeEvent.layout.height;
      this.setState({borderRadius: height / 2});
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

  get isIconButton() {
    const {iconSource, label} = this.props;
    return iconSource && !label;
  }

  getBackgroundColor() {
    const {backgroundColor: themeBackgroundColor} = this.getThemeProps();
    const {disabled, outline, link, backgroundColor: propsBackgroundColor} = this.props;
    const {backgroundColor: stateBackgroundColor} = this.state;

    if (!outline && !link) {
      if (disabled) {
        return ThemeManager.CTADisabledColor;
      }

      return propsBackgroundColor || stateBackgroundColor || themeBackgroundColor || Colors.blue30;
    }
    return 'transparent';
  }

  getActiveBackgroundColor() {
    const {getActiveBackgroundColor} = this.getThemeProps();
    if (getActiveBackgroundColor) {
      return getActiveBackgroundColor(this.getBackgroundColor(), this.getThemeProps());
    }
  }

  getLabelColor() {
    const {link, linkColor, outline, outlineColor, disabled} = this.getThemeProps(); // this.props;

    let color = Colors.white;
    if (link) {
      color = linkColor || Colors.blue30;
    } else if (outline) {
      color = outlineColor || Colors.blue30;
    } else if (this.isIconButton) {
      color = Colors.dark10;
    }

    if (disabled && (link || outline)) {
      return ThemeManager.CTADisabledColor;
    }

    color = this.props.color || this.extractColorValue() || color;
    return color;
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
    const {size, outline, link, avoidMinWidth, avoidInnerPadding} = this.props;

    const CONTAINER_STYLE_BY_SIZE = {};
    CONTAINER_STYLE_BY_SIZE[Button.sizes.xSmall] = {
      paddingVertical: 3,
      paddingHorizontal: 11,
      minWidth: 66,
    };
    CONTAINER_STYLE_BY_SIZE[Button.sizes.small] = {
      paddingVertical: 4.5,
      paddingHorizontal: 14,
      minWidth: 70,
    };
    CONTAINER_STYLE_BY_SIZE[Button.sizes.medium] = {
      paddingVertical: 6.5,
      paddingHorizontal: 16,
      minWidth: 77,
    };
    CONTAINER_STYLE_BY_SIZE[Button.sizes.large] = {
      paddingVertical: 9.5,
      paddingHorizontal: 20,
      minWidth: 90,
    };

    if (outline) {
      _.forEach(CONTAINER_STYLE_BY_SIZE, (style) => {
        style.paddingVertical -= 1; // eslint-disable-line
        style.paddingHorizontal -= 1; // eslint-disable-line
      });
    }

    const containerSizeStyle = CONTAINER_STYLE_BY_SIZE[size];

    if (link || this.isIconButton) {
      containerSizeStyle.paddingVertical = undefined;
      containerSizeStyle.paddingHorizontal = undefined;
      containerSizeStyle.minWidth = undefined;
    }

    if (avoidMinWidth) {
      containerSizeStyle.minWidth = undefined;
    }

    if (avoidInnerPadding) {
      containerSizeStyle.paddingVertical = undefined;
      containerSizeStyle.paddingHorizontal = undefined;
    }

    return containerSizeStyle;
  }

  getOutlineStyle() {
    const {outline, outlineColor, outlineWidth, link, disabled} = this.getThemeProps();
    let outlineStyle;
    if ((outline || outlineColor) && !link) {
      outlineStyle = {
        borderWidth: outlineWidth || 1,
        borderColor: outlineColor || Colors.blue30,
      };

      if (disabled) {
        outlineStyle.borderColor = Colors.dark70;
      }
    }
    return outlineStyle;
  }

  getBorderRadiusStyle() {
    const {link, fullWidth, borderRadius: borderRadiusFromProps} = this.props;
    if (link || fullWidth || borderRadiusFromProps === 0) {
      return {borderRadius: 0};
    }

    const {borderRadius: borderRadiusFromState} = this.state;
    const borderRadius = borderRadiusFromProps || borderRadiusFromState || BorderRadiuses.br100;
    return {borderRadius};
  }

  getShadowStyle() {
    const backgroundColor = this.getBackgroundColor();
    const {enableShadow} = this.props;
    if (enableShadow) {
      return [this.styles.shadowStyle, backgroundColor && {shadowColor: backgroundColor}];
    }
  }

  getIconStyle() {
    const {size, disabled, iconStyle: propsIconStyle, iconOnRight} = this.props;
    const iconStyle = {
      tintColor: this.getLabelColor(),
    };

    const marginSide = [Button.sizes.large, Button.sizes.medium].includes(size) ? 8 : 4;
    if (!this.isIconButton) {
      if (iconOnRight) {
        iconStyle.marginLeft = marginSide;
      } else {
        iconStyle.marginRight = marginSide;
      }
    }

    if (disabled && !this.isFilled) {
      iconStyle.tintColor = Colors.dark60;
    }

    return [iconStyle, propsIconStyle];
  }

  renderIcon() {
    const {iconSource} = this.props;
    if (iconSource) {
      const iconStyle = this.getIconStyle();
      return <Image source={iconSource} style={iconStyle} />;
    }
    return null;
  }

  renderLabel() {
    const {label, labelStyle, labelProps} = this.props;
    const typography = this.extractTypographyValue();
    const color = this.getLabelColor();
    const labelSizeStyle = this.getLabelSizeStyle();
    if (label) {
      return (
        <Text
          style={[this.styles.text, color && {color}, labelSizeStyle, {...typography}, labelStyle]}
          numberOfLines={1}
          {...labelProps}
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
    const borderRadiusStyle = this.getBorderRadiusStyle();

    return (
      <TouchableOpacity
        style={[
          this.styles.container,
          containerSizeStyle,
          (link) && this.styles.innerContainerLink,
          shadowStyle,
          margins,
          containerStyle,
          backgroundColor && {backgroundColor},
          borderRadiusStyle,
          outlineStyle,
          style,
        ]}
        activeOpacity={0.6}
        activeBackgroundColor={this.getActiveBackgroundColor()}
        onLayout={this.getComponentDimensions}
        onPress={onPress}
        disabled={disabled}
        testID={testID}
        {...others}
      >
        <View row centerV>
          {this.props.children}
          {this.props.iconOnRight ? this.renderLabel() : this.renderIcon()}
          {this.props.iconOnRight ? this.renderIcon() : this.renderLabel()}
        </View>
      </TouchableOpacity>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
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
      shadowColor: Colors.blue10,
      shadowOffset: {height: 5, width: 0},
      shadowOpacity: 0.35,
      shadowRadius: 9.5,
      elevation: 2,
    },
    text: {
      backgroundColor: 'transparent',
      flex: 0,
      flexDirection: 'row',
      ...Typography.text70,
      fontWeight: '100',
    },
  });
}
