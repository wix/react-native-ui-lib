import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {Platform, StyleSheet, LayoutAnimation, Image} from 'react-native';
import {Constants} from '../../helpers';
import {Colors, Typography, ThemeManager, BorderRadiuses} from '../../style';
import {PureBaseComponent} from '../../commons';
import TouchableOpacity from '../touchableOpacity';
import Text from '../text';

const PADDINGS = {
  XSMALL: 3,
  SMALL: 4.5,
  MEDIUM: 6.5,
  LARGE: 9.5
};
const HORIZONTAL_PADDINGS = {
  XSMALL: 11,
  SMALL: 14,
  MEDIUM: 16,
  LARGE: 20
};
const MIN_WIDTH = {
  XSMALL: 66,
  SMALL: 70,
  MEDIUM: 77,
  LARGE: 90
};
const DEFAULT_SIZE = 'large';

/**
 * @description: Basic button component
 * @extends: TouchableOpacity
 * @extendslink: docs/TouchableOpacity
 * @modifiers: margin, background
 * @gif: https://media.giphy.com/media/xULW8j5WzsuPytqklq/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ButtonsScreen.js
 */
export default class Button extends PureBaseComponent {
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
    iconSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.func]),
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
     * Props that will be passed to the button's Text label.
     */
    labelProps: PropTypes.object,
    /**
     * should the button act as a coast to coast button (no border radius)
     */
    fullWidth: PropTypes.bool,
    /**
     * should the button be a round button
     */
    round: PropTypes.bool,
    /**
     * Control shadow visibility
     */
    enableShadow: PropTypes.bool, // iOS-only
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
     * should animate layout change
     * Note: For Android you must set 'setLayoutAnimationEnabledExperimental(true)' via RN's 'UIManager'
     */
    animateLayout: PropTypes.bool,
    /**
     * the direction of the animation ('left' and 'right' will effect the button's own alignment)
     */
    animateTo: PropTypes.oneOf(['center', 'left', 'right'])
  };

  static defaultProps = {
    iconOnRight: false
  };

  static sizes = {
    xSmall: 'xSmall',
    small: 'small',
    medium: 'medium',
    large: 'large'
  };

  static animationDirection = {
    center: 'center',
    left: 'left',
    right: 'right'
  };

  // This redundant constructor for some reason fix tests :/
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.animateLayout && !_.isEqual(prevProps, this.props)) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  }

  componentDidMount() {
    Constants.addDimensionsEventListener(this.onOrientationChanged);
  }

  componentWillUnmount() {
    Constants.removeDimensionsEventListener(this.onOrientationChanged);
  }

  onOrientationChanged = () => {
    if (Constants.isTablet && this.props.fullWidth) {
      // only to trigger re-render
      this.setState({isLandscape: Constants.isLandscape});
    }
  };

  // This method will be called more than once in case of layout change!
  onLayout = event => {
    const height = event.nativeEvent.layout.height;
    if (this.props.round) {
      const width = event.nativeEvent.layout.width;
      const size = height >= width ? height : width;
      this.setState({size});
    }

    if (Constants.isAndroid && Platform.Version <= 17) {
      this.setState({borderRadius: height / 2});
    }
  };

  generateStyles() {
    this.styles = createStyles(this.getThemeProps());
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
    const {iconSource, label} = this.getThemeProps();
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
    const {link, linkColor, outline, outlineColor, disabled, color: propsColor} = this.getThemeProps();

    let color = Colors.white;
    if (link) {
      color = linkColor || Colors.blue30;
    } else if (outline) {
      color = outlineColor || Colors.blue30;
    } else if (this.isIconButton) {
      color = undefined; // Colors.dark10;
    }

    if (disabled && (link || outline)) {
      return ThemeManager.CTADisabledColor;
    }

    color = propsColor || this.extractColorValue() || color;
    return color;
  }

  getLabelSizeStyle() {
    const size = this.getThemeProps().size || DEFAULT_SIZE;

    const LABEL_STYLE_BY_SIZE = {};
    LABEL_STYLE_BY_SIZE[Button.sizes.xSmall] = {...Typography.text80};
    LABEL_STYLE_BY_SIZE[Button.sizes.small] = {...Typography.text80};
    LABEL_STYLE_BY_SIZE[Button.sizes.medium] = {...Typography.text80};
    LABEL_STYLE_BY_SIZE[Button.sizes.large] = {};

    const labelSizeStyle = LABEL_STYLE_BY_SIZE[size];
    return labelSizeStyle;
  }

  getContainerSizeStyle() {
    const {outline, link, avoidMinWidth, avoidInnerPadding, round} = this.getThemeProps();
    const size = this.getThemeProps().size || DEFAULT_SIZE;
    const outlineWidth = this.getThemeProps().outlineWidth || 1;

    const CONTAINER_STYLE_BY_SIZE = {};
    CONTAINER_STYLE_BY_SIZE[Button.sizes.xSmall] = round
      ? {height: this.state.size, width: this.state.size, padding: PADDINGS.XSMALL}
      : {
        paddingVertical: PADDINGS.XSMALL,
        paddingHorizontal: HORIZONTAL_PADDINGS.XSMALL,
        minWidth: MIN_WIDTH.XSMALL
      };
    CONTAINER_STYLE_BY_SIZE[Button.sizes.small] = round
      ? {height: this.state.size, width: this.state.size, padding: PADDINGS.SMALL}
      : {
        paddingVertical: PADDINGS.SMALL,
        paddingHorizontal: HORIZONTAL_PADDINGS.SMALL,
        minWidth: MIN_WIDTH.SMALL
      };
    CONTAINER_STYLE_BY_SIZE[Button.sizes.medium] = round
      ? {height: this.state.size, width: this.state.size, padding: PADDINGS.MEDIUM}
      : {
        paddingVertical: PADDINGS.MEDIUM,
        paddingHorizontal: HORIZONTAL_PADDINGS.MEDIUM,
        minWidth: MIN_WIDTH.MEDIUM
      };
    CONTAINER_STYLE_BY_SIZE[Button.sizes.large] = round
      ? {height: this.state.size, width: this.state.size, padding: PADDINGS.LARGE}
      : {
        paddingVertical: PADDINGS.LARGE,
        paddingHorizontal: HORIZONTAL_PADDINGS.LARGE,
        minWidth: MIN_WIDTH.LARGE
      };

    if (outline) {
      _.forEach(CONTAINER_STYLE_BY_SIZE, style => {
        if (round) {
          style.padding -= outlineWidth; // eslint-disable-line
        } else {
          style.paddingVertical -= outlineWidth; // eslint-disable-line
          style.paddingHorizontal -= outlineWidth; // eslint-disable-line
        }
      });
    }

    const containerSizeStyle = CONTAINER_STYLE_BY_SIZE[size];

    if (link || (this.isIconButton && !round)) {
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
        borderColor: outlineColor || Colors.blue30
      };

      if (disabled) {
        outlineStyle.borderColor = Colors.dark70;
      }
    }
    return outlineStyle;
  }

  getBorderRadiusStyle() {
    const {link, fullWidth, borderRadius: borderRadiusFromProps} = this.getThemeProps();
    if (link || fullWidth || borderRadiusFromProps === 0) {
      return {borderRadius: 0};
    }

    const {borderRadius: borderRadiusFromState} = this.state;
    const borderRadius = borderRadiusFromProps || borderRadiusFromState || BorderRadiuses.br100;
    return {borderRadius};
  }

  getShadowStyle() {
    const backgroundColor = this.getBackgroundColor();
    const {enableShadow} = this.getThemeProps();
    if (enableShadow) {
      return [this.styles.shadowStyle, backgroundColor && {shadowColor: backgroundColor}];
    }
  }

  getIconStyle() {
    const {disabled, iconStyle: propsIconStyle, iconOnRight} = this.getThemeProps();
    const size = this.getThemeProps().size || DEFAULT_SIZE;
    const iconStyle = {
      tintColor: this.getLabelColor()
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

  getAnimationDirectionStyle() {
    const {animateTo} = this.getThemeProps();

    let style;
    switch (animateTo) {
      case 'left':
        style = {alignSelf: 'flex-start'};
        break;
      case 'right':
        style = {alignSelf: 'flex-end'};
        break;
      default:
        // 'center' is the default
        break;
    }
    return style;
  }

  renderIcon() {
    const {iconSource} = this.props;

    if (iconSource) {
      const iconStyle = this.getIconStyle();
      if (typeof iconSource === 'function') {
        return iconSource(iconStyle);
      } else {
        return <Image source={iconSource} style={iconStyle}/>;
      }
    }
    return null;
  }

  renderLabel() {
    const {label, labelStyle, labelProps} = this.getThemeProps();
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
    const {onPress, disabled, link, style, testID, animateLayout, ...others} = this.getThemeProps();
    const shadowStyle = this.getShadowStyle();
    const {margins} = this.state;
    const backgroundColor = this.getBackgroundColor();
    const outlineStyle = this.getOutlineStyle();
    const containerSizeStyle = this.getContainerSizeStyle();
    const borderRadiusStyle = this.getBorderRadiusStyle();

    return (
      <TouchableOpacity
        row
        centerV
        style={[
          this.styles.container,
          animateLayout && this.getAnimationDirectionStyle(),
          containerSizeStyle,
          link && this.styles.innerContainerLink,
          shadowStyle,
          margins,
          backgroundColor && {backgroundColor},
          borderRadiusStyle,
          outlineStyle,
          style
        ]}
        activeOpacity={0.6}
        activeBackgroundColor={this.getActiveBackgroundColor()}
        onLayout={this.onLayout}
        onPress={onPress}
        disabled={disabled}
        testID={testID}
        {...others}
        ref={this.setRef}
      >
        {this.props.children}
        {this.props.iconOnRight ? this.renderLabel() : this.renderIcon()}
        {this.props.iconOnRight ? this.renderIcon() : this.renderLabel()}
      </TouchableOpacity>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center'
    },
    containerDisabled: {
      backgroundColor: Colors.dark60
    },
    innerContainerLink: {
      minWidth: undefined,
      paddingHorizontal: undefined,
      paddingVertical: undefined,
      borderRadius: BorderRadiuses.br0,
      backgroundColor: undefined
    },
    shadowStyle: {
      shadowColor: Colors.blue10,
      shadowOffset: {height: 5, width: 0},
      shadowOpacity: 0.35,
      shadowRadius: 9.5,
      elevation: 2
    },
    text: {
      backgroundColor: 'transparent',
      flex: 0,
      flexDirection: 'row',
      ...Typography.text70
    }
  });
}
