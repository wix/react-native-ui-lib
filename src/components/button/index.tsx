import _ from 'lodash';
import memoize from 'memoize-one';
import React, {PureComponent} from 'react';
import {Platform, StyleSheet, LayoutAnimation, LayoutChangeEvent, ImageStyle, TextStyle} from 'react-native';
import {asBaseComponent, forwardRef, Constants} from '../../commons/new';
import {Colors, Typography, BorderRadiuses} from 'style';
import TouchableOpacity from '../touchableOpacity';
import Text from '../text';
import Image from '../image';

import {ButtonSize, ButtonAnimationDirection, ButtonProps, ButtonState, Props, DEFAULT_PROPS} from './ButtonTypes';
export {ButtonSize, ButtonAnimationDirection, ButtonProps};

import {PADDINGS, HORIZONTAL_PADDINGS, MIN_WIDTH, DEFAULT_SIZE} from './ButtonConstants';

class Button extends PureComponent<Props, ButtonState> {
  static displayName = 'Button';

  static defaultProps = DEFAULT_PROPS;

  static sizes = ButtonSize;

  static animationDirection = ButtonAnimationDirection;

  // This redundant constructor for some reason fix tests :/
  // eslint-disable-next-line
  constructor(props: Props) {
    super(props);
  }

  state = {
    size: undefined
  };
  styles = createStyles();

  componentDidUpdate(prevProps: Props) {
    if (this.props.animateLayout && !_.isEqual(prevProps, this.props)) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  }

  // This method will be called more than once in case of layout change!
  onLayout = (event: LayoutChangeEvent) => {
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

  get isOutline() {
    const {outline, outlineColor} = this.props;
    return Boolean(outline || outlineColor);
  }

  get isLink() {
    const {link, hyperlink} = this.props;
    return link || hyperlink;
  }

  get isFilled() {
    return !this.isOutline && !this.isLink;
  }

  get isIconButton() {
    const {iconSource, label} = this.props;
    return iconSource && !label;
  }

  getBackgroundColor = memoize(({disabled, outline, disabledBackgroundColor, backgroundColor, modifiersBackgroundColor}) => {
    if (!outline && !this.isLink) {
      if (disabled) {
        return disabledBackgroundColor || Colors.$backgroundDisabled;
      }

      return backgroundColor || modifiersBackgroundColor || Colors.$backgroundPrimaryHeavy;
    }
    return 'transparent';
  },
  _.isEqual);

  getActiveBackgroundColor = memoize(({
    getActiveBackgroundColor,
    disabled,
    outline,
    disabledBackgroundColor,
    backgroundColor,
    modifiersBackgroundColor
  }) => {
    if (getActiveBackgroundColor) {
      return getActiveBackgroundColor(this.getBackgroundColor({
        disabled,
        outline,
        disabledBackgroundColor,
        backgroundColor,
        modifiersBackgroundColor
      }),
      this.props);
    }
  },
  _.isEqual);

  getLabelColor = memoize(({linkColor, outline, outlineColor, disabled, propsColor, backgroundColor, modifiersColor}) => {
    const isLink = this.isLink;

    let color: string | undefined = Colors.$textDefaultLight;
    if (isLink) {
      color = linkColor || Colors.$textPrimary;
    } else if (outline) {
      color = outlineColor || Colors.$textPrimary;
    } else if (this.isIconButton) {
      color = backgroundColor === 'transparent' ? undefined : Colors.$iconDefaultLight;
    }

    if (disabled && (isLink || outline)) {
      return Colors.$textDisabled;
    }

    color = propsColor || modifiersColor || color;
    return color;
  },
  _.isEqual);

  getLabelSizeStyle = memoize(({propsSize}) => {
    const size = propsSize || DEFAULT_SIZE;

    const LABEL_STYLE_BY_SIZE: Dictionary<TextStyle | undefined> = {};
    LABEL_STYLE_BY_SIZE[Button.sizes.xSmall] = Typography.text80;
    LABEL_STYLE_BY_SIZE[Button.sizes.small] = Typography.text80;
    LABEL_STYLE_BY_SIZE[Button.sizes.medium] = Typography.text80;
    LABEL_STYLE_BY_SIZE[Button.sizes.large] = undefined;

    const labelSizeStyle = LABEL_STYLE_BY_SIZE[size];
    return labelSizeStyle;
  }, _.isEqual);

  getContainerSizeStyle = memoize(({outline, avoidMinWidth, avoidInnerPadding, round, size: propsSize, outlineWidth: propsOutlineWidth}) => {
    const size = propsSize || DEFAULT_SIZE;
    const outlineWidth = propsOutlineWidth || 1;

    const CONTAINER_STYLE_BY_SIZE: Dictionary<any> = {};
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

    if (this.isLink || (this.isIconButton && !round)) {
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
  },
  _.isEqual);

  getOutlineStyle = memoize(({outline, outlineColor, outlineWidth, disabled}) => {
    let outlineStyle;
    if ((outline || outlineColor) && !this.isLink) {
      outlineStyle = {
        borderWidth: outlineWidth || 1,
        borderColor: outlineColor || Colors.$outlinePrimary
      };

      if (disabled) {
        outlineStyle.borderColor = Colors.$outlineDisabled;
      }
    }
    return outlineStyle;
  }, _.isEqual);

  getBorderRadiusStyle = memoize(({fullWidth, propsBorderRadius, modifiersBorderRadius}) => {
    if (this.isLink || fullWidth || propsBorderRadius === 0) {
      return {borderRadius: 0};
    }

    const borderRadius = propsBorderRadius || modifiersBorderRadius || BorderRadiuses.br100;
    return {borderRadius};
  }, _.isEqual);

  getShadowStyle = memoize(({enableShadow, backgroundColor}) => {
    if (enableShadow) {
      return [this.styles.shadowStyle, {shadowColor: backgroundColor}];
    }
  }, _.isEqual);

  getIconStyle = memoize(({
    disabled,
    propsIconStyle,
    iconOnRight,
    propsSize,
    linkColor,
    outline,
    outlineColor,
    propsColor,
    backgroundColor,
    modifiersColor
  }) => {
    const size = propsSize || DEFAULT_SIZE;
    const iconStyle: ImageStyle = {
      tintColor: this.getLabelColor({
        linkColor,
        outline,
        outlineColor,
        disabled,
        propsColor,
        backgroundColor,
        modifiersColor
      })
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
      iconStyle.tintColor = Colors.$iconDisabled;
    }

    return [iconStyle, propsIconStyle];
  },
  _.isEqual);

  getAnimationDirectionStyle = memoize(({animateTo}) => {
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
  }, _.isEqual);

  getTextStyle = memoize(({
    typography,
    labelStyle,
    propsSize,
    linkColor,
    outline,
    outlineColor,
    disabled,
    propsColor,
    backgroundColor,
    modifiersColor
  }) => {
    const labelSizeStyle = this.getLabelSizeStyle({propsSize});
    const color = this.getLabelColor({
      linkColor,
      outline,
      outlineColor,
      disabled,
      propsColor,
      backgroundColor,
      modifiersColor
    });
    return [this.styles.text, !!color && {color}, labelSizeStyle, typography, labelStyle];
  },
  _.isEqual);

  getContainerStyle = memoize(({
    outline,
    animateLayout,
    margins,
    paddings,
    style,
    modifiersBackgroundColor,
    backgroundColor,
    disabled,
    enableShadow,
    disabledBackgroundColor,
    outlineColor,
    outlineWidth,
    avoidMinWidth,
    avoidInnerPadding,
    round,
    size,
    fullWidth,
    borderRadius,
    modifiersBorderRadius,
    animateTo
  }) => {
    const shadowStyle = this.getShadowStyle({enableShadow, backgroundColor});
    const backgroundColorStyle = this.getBackgroundColor({
      disabled,
      outline,
      disabledBackgroundColor,
      backgroundColor,
      modifiersBackgroundColor
    });
    const outlineStyle = this.getOutlineStyle({outline, outlineColor, outlineWidth, disabled});
    const containerSizeStyle = this.getContainerSizeStyle({
      outline,
      avoidMinWidth,
      avoidInnerPadding,
      round,
      size,
      outlineWidth
    });
    const borderRadiusStyle = this.getBorderRadiusStyle({
      fullWidth,
      propsBorderRadius: borderRadius,
      modifiersBorderRadius
    });
    const animationDirectionStyle = this.getAnimationDirectionStyle({animateTo});
    return [
      this.styles.container,
      animateLayout && animationDirectionStyle,
      containerSizeStyle,
      this.isLink && this.styles.innerContainerLink,
      shadowStyle,
      margins,
      paddings,
      {backgroundColor: backgroundColorStyle},
      borderRadiusStyle,
      outlineStyle,
      style
    ];
  },
  _.isEqual);

  renderIcon() {
    const {
      iconSource,
      supportRTL,
      testID,
      disabled,
      iconStyle: propsIconStyle,
      iconOnRight,
      size: propsSize,
      linkColor,
      outline,
      outlineColor,
      color: propsColor,
      backgroundColor,
      modifiers
    } = this.props;
    const {color: modifiersColor} = modifiers;

    if (iconSource) {
      const iconStyle = this.getIconStyle({
        disabled,
        propsIconStyle,
        iconOnRight,
        propsSize,
        linkColor,
        outline,
        outlineColor,
        propsColor,
        backgroundColor,
        modifiersColor
      });

      if (typeof iconSource === 'function') {
        return iconSource(iconStyle);
      } else {
        return <Image source={iconSource} supportRTL={supportRTL} style={iconStyle} testID={`${testID}.icon`}/>;
      }
    }
    return null;
  }

  renderLabel() {
    const {
      label,
      labelStyle,
      labelProps,
      hyperlink,
      testID,
      modifiers,
      size: propsSize,
      linkColor,
      outline,
      outlineColor,
      disabled,
      color: propsColor,
      backgroundColor
    } = this.props;
    const {typography, color: modifiersColor} = modifiers;

    if (label) {
      return (
        <Text
          style={this.getTextStyle({
            typography,
            labelStyle,
            propsSize,
            linkColor,
            outline,
            outlineColor,
            disabled,
            propsColor,
            backgroundColor,
            modifiersColor
          })}
          underline={hyperlink}
          numberOfLines={1}
          testID={`${testID}.label`}
          {...labelProps}
        >
          {label}
        </Text>
      );
    }
    return null;
  }

  render() {
    const {
      onPress,
      disabled,
      style,
      testID,
      outline,
      animateLayout,
      modifiers,
      enableShadow,
      disabledBackgroundColor,
      outlineColor,
      outlineWidth,
      backgroundColor,
      forwardedRef,
      avoidMinWidth,
      avoidInnerPadding,
      round,
      size,
      fullWidth,
      borderRadius,
      animateTo,
      getActiveBackgroundColor,
      ...others
    } = this.props;
    const {
      margins,
      paddings,
      backgroundColor: modifiersBackgroundColor,
      borderRadius: modifiersBorderRadius
    } = modifiers;

    return (
      <TouchableOpacity
        row
        centerV
        style={this.getContainerStyle({
          outline,
          animateLayout,
          margins,
          paddings,
          style,
          modifiersBackgroundColor,
          backgroundColor,
          disabled,
          enableShadow,
          disabledBackgroundColor,
          outlineColor,
          outlineWidth,
          avoidMinWidth,
          avoidInnerPadding,
          round,
          size,
          fullWidth,
          borderRadius,
          modifiersBorderRadius,
          animateTo
        })}
        activeOpacity={0.6}
        activeBackgroundColor={this.getActiveBackgroundColor({
          getActiveBackgroundColor,
          disabled,
          outline,
          disabledBackgroundColor,
          backgroundColor,
          modifiersBackgroundColor
        })}
        onLayout={this.onLayout}
        onPress={onPress}
        disabled={disabled}
        testID={testID}
        {...others}
        ref={forwardedRef}
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
    innerContainerLink: {
      minWidth: undefined,
      paddingHorizontal: undefined,
      paddingVertical: undefined,
      borderRadius: BorderRadiuses.br0,
      backgroundColor: undefined
    },
    shadowStyle: {
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

export {Button}; // For tests

const modifiersOptions = {
  paddings: true,
  margins: true,
  borderRadius: true,
  backgroundColor: true,
  typography: true,
  color: true
};

export default asBaseComponent<ButtonProps, typeof Button>(forwardRef<Props>(Button), {modifiersOptions});
