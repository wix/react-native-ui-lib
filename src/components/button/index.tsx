import _ from 'lodash';
import React, {PureComponent} from 'react';
import {Platform, StyleSheet, LayoutAnimation, LayoutChangeEvent, ImageStyle, TextStyle, StyleProp} from 'react-native';
import {asBaseComponent, forwardRef, Constants} from '../../commons/new';
import {Colors, Typography, BorderRadiuses} from 'style';
import TouchableOpacity from '../touchableOpacity';
import type {Dictionary, ComponentStatics} from '../../typings/common';
import Text from '../text';
import Icon from '../icon';
import {
  ButtonSize,
  ButtonAnimationDirection,
  ButtonProps,
  ButtonState,
  Props,
  DEFAULT_PROPS,
  ButtonSizeProp
} from './types';
import {PADDINGS, HORIZONTAL_PADDINGS, MIN_WIDTH, DEFAULT_SIZE, SIZE_TO_VERTICAL_HITSLOP} from './ButtonConstants';

export {ButtonSize, ButtonAnimationDirection, ButtonProps};

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

  state: Record<'size', undefined | number> = {
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

    if (Constants.isAndroid && (Platform.Version as number) <= 17) {
      this.setState({borderRadius: height / 2});
    }
  };

  get isLink() {
    const {link, hyperlink} = this.props;
    return link || hyperlink;
  }

  get isFilled() {
    return this.getBackgroundColor() !== 'transparent';
  }

  get isIconButton() {
    const {iconSource, label} = this.props;
    return iconSource && !label;
  }

  getBackgroundColor() {
    const {disabled, outline, disabledBackgroundColor, backgroundColor, modifiers} = this.props;
    const {backgroundColor: modifiersBackgroundColor} = modifiers;

    if (!outline && !this.isLink) {
      if (disabled) {
        return disabledBackgroundColor || Colors.$backgroundDisabled;
      }

      return backgroundColor || modifiersBackgroundColor || Colors.$backgroundPrimaryHeavy;
    }
    if (!outline && backgroundColor) {
      return backgroundColor;
    }
    return 'transparent';
  }

  getActiveBackgroundColor() {
    const {getActiveBackgroundColor} = this.props;

    if (getActiveBackgroundColor) {
      return getActiveBackgroundColor(this.getBackgroundColor(), this.props);
    }
  }

  getLabelColor() {
    const {linkColor, outline, outlineColor, disabled, color: propsColor, backgroundColor, modifiers} = this.props;
    const {color: modifiersColor} = modifiers;
    const isLink = this.isLink;

    let color: string | undefined = Colors.$textDefaultLight;
    if (isLink) {
      color = linkColor || Colors.$textPrimary;
    } else if (outline) {
      color = outlineColor || Colors.$textPrimary;
    } else if (this.isIconButton) {
      color = backgroundColor === 'transparent' ? undefined : Colors.$iconDefaultLight;
    }

    if (disabled && !this.isFilled) {
      return Colors.$textDisabled;
    }

    color = propsColor || modifiersColor || color;
    return color;
  }

  getIconColor(): string | undefined {
    const {disabled} = this.props;
    let tintColor = this.getLabelColor();

    if (disabled && !this.isFilled) {
      tintColor = Colors.$iconDisabled;
    }

    return tintColor;
  }

  getLabelSizeStyle() {
    const size = this.props.size || DEFAULT_SIZE;

    const LABEL_STYLE_BY_SIZE: Dictionary<TextStyle | undefined> = {};
    LABEL_STYLE_BY_SIZE[Button.sizes.xSmall] = Typography.text80;
    LABEL_STYLE_BY_SIZE[Button.sizes.small] = Typography.text80;
    LABEL_STYLE_BY_SIZE[Button.sizes.medium] = Typography.text80;
    LABEL_STYLE_BY_SIZE[Button.sizes.large] = undefined;

    const labelSizeStyle = LABEL_STYLE_BY_SIZE[size];
    return labelSizeStyle;
  }

  getContainerSizeStyle() {
    const {avoidMinWidth, avoidInnerPadding, round, size: propsSize} = this.props;
    const size = propsSize || DEFAULT_SIZE;

    const CONTAINER_STYLE_BY_SIZE: Record<
      string,
      Partial<{
        height: number;
        width: number;
        padding: number;
        paddingVertical: number;
        paddingHorizontal: number;
        minWidth: number;
      }>
    > = {};
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
  }

  getOutlineStyle() {
    const {outline, outlineColor, outlineWidth, disabled} = this.props;

    let outlineStyle;
    if ((outline || outlineColor) && !this.isLink) {
      outlineStyle = {
        borderWidth: outlineWidth ?? 1,
        borderColor: outlineColor || Colors.$outlinePrimary
      };

      if (disabled) {
        outlineStyle.borderColor = Colors.$outlineDisabled;
      }
    }
    return outlineStyle;
  }

  getBorderRadiusStyle() {
    const {fullWidth, borderRadius: propsBorderRadius, modifiers} = this.props;
    const {borderRadius: modifiersBorderRadius} = modifiers;

    if (this.isLink || fullWidth || propsBorderRadius === 0) {
      return {borderRadius: 0};
    }

    const borderRadius = propsBorderRadius || modifiersBorderRadius || BorderRadiuses.br100;
    return {borderRadius};
  }

  getShadowStyle() {
    const backgroundColor = this.getBackgroundColor();
    const {enableShadow} = this.props;

    if (enableShadow) {
      return [this.styles.shadowStyle, {shadowColor: backgroundColor}];
    }
  }

  getIconStyle(): [ImageStyle, StyleProp<ImageStyle>] {
    const {iconStyle: propsIconStyle, iconOnRight, size: propsSize, link} = this.props;
    const size = propsSize || DEFAULT_SIZE;
    const iconStyle: ImageStyle = {};
    const marginSide = link
      ? 4
      : ([Button.sizes.large, Button.sizes.medium] as ButtonSizeProp[]).includes(size)
        ? 8
        : 4;

    if (!this.isIconButton) {
      if (iconOnRight) {
        iconStyle.marginLeft = marginSide;
      } else {
        iconStyle.marginRight = marginSide;
      }
    }

    return [iconStyle, propsIconStyle];
  }

  getAnimationDirectionStyle() {
    const {animateTo} = this.props;

    let style;
    switch (animateTo) {
      case 'left':
        style = {alignSelf: 'flex-start'} as const;
        break;
      case 'right':
        style = {alignSelf: 'flex-end'} as const;
        break;
      default:
        // 'center' is the default
        break;
    }
    return style;
  }

  renderIcon() {
    const {iconSource, supportRTL, testID, iconProps} = this.props;

    if (iconSource) {
      const iconColor = this.getIconColor();
      const iconStyle = this.getIconStyle();

      if (typeof iconSource === 'function') {
        return iconSource([{tintColor: iconColor}, this.getIconStyle()]);
      } else {
        // if (Constants.isWeb) {
        return (
          <Icon
            style={iconStyle}
            source={iconSource}
            supportRTL={supportRTL}
            testID={`${testID}.icon`}
            // Note: Passing tintColor as prop is required for Web
            tintColor={iconColor}
            {...iconProps}
          />
        );
        // }
        // return (
        //   <Image
        //     source={iconSource}
        //     supportRTL={supportRTL}
        //     style={iconStyle}
        //     testID={`${testID}.icon`}
        //     {...iconProps}
        //   />
        // );
      }
    }
    return null;
  }

  renderLabel() {
    const {label, labelStyle, labelProps, hyperlink, testID, modifiers} = this.props;
    const color = this.getLabelColor();
    const labelSizeStyle = this.getLabelSizeStyle();
    const {typography} = modifiers;

    if (label) {
      return (
        <Text
          style={[this.styles.text, !!color && {color}, labelSizeStyle, typography, labelStyle]}
          underline={hyperlink}
          numberOfLines={1}
          testID={`${testID}.label`}
          recorderTag={'unmask'}
          {...labelProps}
        >
          {label}
        </Text>
      );
    }
    return null;
  }

  getAccessibleHitSlop() {
    const containerStyle = this.getContainerSizeStyle();
    const isWidthSet = containerStyle.width !== undefined || containerStyle.minWidth !== undefined;
    const width = containerStyle.width || containerStyle.minWidth || 0;
    const widthWithPadding = width + (containerStyle.paddingHorizontal || containerStyle.padding || 0) * 2;
    const horizontalHitslop = isWidthSet ? Math.max(0, (48 - widthWithPadding) / 2) : 10;
    const verticalHitslop =
      (containerStyle.height
        ? Math.max(0, 48 - containerStyle.height)
        : SIZE_TO_VERTICAL_HITSLOP[this.props.size || DEFAULT_SIZE]) / 2;
    return {
      top: verticalHitslop,
      bottom: verticalHitslop,
      left: horizontalHitslop,
      right: horizontalHitslop
    };
  }

  render() {
    const {
      onPress,
      disabled,
      style,
      testID,
      animateLayout,
      modifiers,
      forwardedRef,
      hitSlop: hitSlopProp,
      ...others
    } = this.props;
    const shadowStyle = this.getShadowStyle();
    const {margins, paddings} = modifiers;
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
          this.isLink && this.styles.innerContainerLink,
          shadowStyle,
          margins,
          paddings,
          {backgroundColor},
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
        hitSlop={hitSlopProp ?? this.getAccessibleHitSlop()}
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

export default asBaseComponent<ButtonProps, ComponentStatics<typeof Button>, {}>(forwardRef(Button), {
  modifiersOptions
});
