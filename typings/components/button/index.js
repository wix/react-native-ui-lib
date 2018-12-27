import React from "react";
import { Platform, Image, StyleSheet } from "react-native";
import _ from "lodash";
import { BaseComponent } from "../../commons";
import { Constants } from "../../helpers";
import Text from "../text";
import TouchableOpacity from "../touchableOpacity";
import { Colors, Typography, ThemeManager, BorderRadiuses } from "../../style";
import View from "../view";
/**
 * @description: Basic button component
 * @extends: TouchableOpacity
 * @extendslink: docs/TouchableOpacity
 * @modifiers: margin, background
 * @gif: https://media.giphy.com/media/xULW8j5WzsuPytqklq/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ButtonsScreen.js
 */
export default class Button extends BaseComponent {
    constructor(props) {
        super(props);
        if (!_.isUndefined(props.containerStyle)) {
            console.error('Button "containerStyle" prop will be deprecated soon, please use "style" instead');
        }
        this.getComponentDimensions = this.getComponentDimensions.bind(this);
    }
    // This method will be called more than once in case of layout change!
    getComponentDimensions(event) {
        if (Constants.isAndroid && Platform.Version <= 17) {
            const height = event.nativeEvent.layout.height;
            this.setState({ borderRadius: height / 2 });
        }
    }
    generateStyles() {
        this.styles = createStyles(this.props);
    }
    get isOutline() {
        const { outline, outlineColor } = this.getThemeProps();
        return Boolean(outline || outlineColor);
    }
    get isFilled() {
        const { link } = this.getThemeProps();
        return !this.isOutline && !link;
    }
    getBackgroundColor() {
        const { disabled, outline, link, backgroundColor: propsBackgroundColor } = this.getThemeProps();
        const { backgroundColor: stateBackgroundColor } = this.state;
        if (!outline && !link) {
            if (disabled) {
                return ThemeManager.CTADisabledColor;
            }
            return propsBackgroundColor || stateBackgroundColor || Colors.blue30;
        }
        return "transparent";
    }
    getActiveBackgroundColor() {
        const { getActiveBackgroundColor } = this.getThemeProps();
        if (getActiveBackgroundColor) {
            return getActiveBackgroundColor(this.getBackgroundColor(), this.getThemeProps());
        }
    }
    getLabelColor() {
        const { link, linkColor, outline, outlineColor, disabled } = this.getThemeProps(); // this.props;
        let color = ThemeManager.CTATextColor;
        if (link) {
            color = linkColor || Colors.blue30;
        }
        else if (outline) {
            color = outlineColor || Colors.blue30;
        }
        if (disabled && (link || outline)) {
            return ThemeManager.CTADisabledColor;
        }
        color = this.props.color || this.extractColorValue() || color;
        return color;
    }
    getContentSizeStyle() {
        const { size, link, avoidInnerPadding } = this.props;
        if (avoidInnerPadding) {
            return;
        }
        const LABEL_STYLE_BY_SIZE = {};
        LABEL_STYLE_BY_SIZE[Button.sizes.xSmall] = { paddingHorizontal: 12 };
        LABEL_STYLE_BY_SIZE[Button.sizes.small] = { paddingHorizontal: 15 };
        LABEL_STYLE_BY_SIZE[Button.sizes.medium] = {
            paddingHorizontal: Constants.isIOS ? 18 : 20
        };
        LABEL_STYLE_BY_SIZE[Button.sizes.large] = {
            paddingHorizontal: Constants.isIOS ? 36 : 28
        };
        const labelSizeStyle = LABEL_STYLE_BY_SIZE[size];
        // todo: treat the same as avoidInnerPadding
        if (link) {
            labelSizeStyle.paddingHorizontal = 0;
        }
        return labelSizeStyle;
    }
    getLabelSizeStyle() {
        const { size } = this.props;
        const LABEL_STYLE_BY_SIZE = {};
        LABEL_STYLE_BY_SIZE[Button.sizes.xSmall] = { ...Typography.text80 };
        LABEL_STYLE_BY_SIZE[Button.sizes.small] = { ...Typography.text80 };
        LABEL_STYLE_BY_SIZE[Button.sizes.medium] = { ...Typography.text80 };
        LABEL_STYLE_BY_SIZE[Button.sizes.large] = {};
        const labelSizeStyle = LABEL_STYLE_BY_SIZE[size];
        return labelSizeStyle;
    }
    getContainerSizeStyle() {
        const { size, outline, avoidMinWidth } = this.props;
        const CONTAINER_STYLE_BY_SIZE = {};
        CONTAINER_STYLE_BY_SIZE[Button.sizes.xSmall] = {
            paddingVertical: Constants.isIOS ? 5 : 4,
            minWidth: Constants.isIOS ? 66 : 60
        };
        CONTAINER_STYLE_BY_SIZE[Button.sizes.small] = {
            paddingVertical: 6,
            minWidth: Constants.isIOS ? 74 : 72
        };
        CONTAINER_STYLE_BY_SIZE[Button.sizes.medium] = {
            paddingVertical: Constants.isIOS ? 11 : 10,
            minWidth: Constants.isIOS ? 95 : 88
        };
        CONTAINER_STYLE_BY_SIZE[Button.sizes.large] = {
            paddingVertical: Constants.isIOS ? 16 : 15,
            minWidth: Constants.isIOS ? 138 : 128
        };
        if (outline) {
            _.forEach(CONTAINER_STYLE_BY_SIZE, style => {
                style.paddingVertical -= 1; // eslint-disable-line
            });
        }
        const containerSizeStyle = CONTAINER_STYLE_BY_SIZE[size];
        if (avoidMinWidth) {
            containerSizeStyle.minWidth = undefined;
        }
        return containerSizeStyle;
    }
    getOutlineStyle() {
        const { outline, outlineColor, outlineWidth, link, disabled } = this.getThemeProps();
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
        const { link, fullWidth, borderRadius: borderRadiusFromProps } = this.props;
        if (link || fullWidth || borderRadiusFromProps === 0) {
            return { borderRadius: 0 };
        }
        const { borderRadius: borderRadiusFromState } = this.state;
        const borderRadius = borderRadiusFromProps || borderRadiusFromState || BorderRadiuses.br100;
        return { borderRadius };
    }
    getShadowStyle() {
        const backgroundColor = this.getBackgroundColor();
        const { enableShadow } = this.props;
        if (enableShadow) {
            return [
                this.styles.shadowStyle,
                backgroundColor && { shadowColor: backgroundColor }
            ];
        }
    }
    getIconStyle() {
        const { size, disabled, iconStyle: propsIconStyle, iconOnRight } = this.props;
        const iconStyle = {
            tintColor: this.getLabelColor()
        };
        const marginSide = [Button.sizes.large, Button.sizes.medium].includes(size)
            ? 8
            : 4;
        if (iconOnRight) {
            iconStyle.marginLeft = marginSide;
        }
        else {
            iconStyle.marginRight = marginSide;
        }
        if (disabled && !this.isFilled) {
            iconStyle.tintColor = Colors.dark60;
        }
        return [iconStyle, propsIconStyle];
    }
    renderIcon() {
        const { iconSource } = this.props;
        if (iconSource) {
            const iconStyle = this.getIconStyle();
            return <Image source={iconSource} style={iconStyle}/>;
        }
        return null;
    }
    renderLabel() {
        const { label, labelStyle, labelProps } = this.props;
        const typography = this.extractTypographyValue();
        const color = this.getLabelColor();
        const labelSizeStyle = this.getLabelSizeStyle();
        if (label) {
            return (<Text style={[
                this.styles.text,
                color && { color },
                labelSizeStyle,
                { ...typography },
                labelStyle
            ]} numberOfLines={1} {...labelProps}>
          {label}
        </Text>);
        }
        return null;
    }
    render() {
        const { onPress, disabled, link, style, containerStyle, testID, ...others } = this.getThemeProps();
        const shadowStyle = this.getShadowStyle();
        const { margins } = this.state;
        const backgroundColor = this.getBackgroundColor();
        const outlineStyle = this.getOutlineStyle();
        const containerSizeStyle = this.getContainerSizeStyle();
        const contentSizeStyle = this.getContentSizeStyle();
        const borderRadiusStyle = this.getBorderRadiusStyle();
        return (<TouchableOpacity style={[
            this.styles.container,
            this.styles.innerContainer,
            containerSizeStyle,
            link && this.styles.innerContainerLink,
            shadowStyle,
            margins,
            containerStyle,
            backgroundColor && { backgroundColor },
            borderRadiusStyle,
            outlineStyle,
            style
        ]} activeOpacity={0.6} activeBackgroundColor={this.getActiveBackgroundColor()} onLayout={this.getComponentDimensions} onPress={onPress} disabled={disabled} testID={testID} {...others}>
        <View row centerV style={contentSizeStyle}>
          {this.props.children}
          {this.props.iconOnRight ? this.renderLabel() : this.renderIcon()}
          {this.props.iconOnRight ? this.renderIcon() : this.renderLabel()}
        </View>
      </TouchableOpacity>);
    }
}
Button.displayName = "Button";
Button.defaultProps = {
    labelStyle: {},
    size: "large",
    outline: false,
    iconOnRight: false
};
Button.sizes = {
    xSmall: "xSmall",
    small: "small",
    medium: "medium",
    large: "large"
};
function createStyles() {
    return StyleSheet.create({
        container: {
            backgroundColor: "transparent"
        },
        innerContainer: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
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
            shadowOffset: { height: 5, width: 0 },
            shadowOpacity: 0.35,
            shadowRadius: 9.5,
            elevation: 2
        },
        text: {
            backgroundColor: "transparent",
            flex: 0,
            flexDirection: "row",
            ...Typography.text70,
            fontWeight: "100"
        }
    });
}
