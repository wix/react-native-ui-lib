import React from "react";
import { TouchableOpacity as RNTouchableOpacity } from "react-native";
import _ from "lodash";
import { BaseComponent } from "../../commons";
import { ThemeManager } from "../../style";
/**
 * @description: A wrapper for TouchableOpacity component. Support onPress, throttling and activeBackgroundColor
 * @extends: TouchableOpacity
 * @extendslink: https://facebook.github.io/react-native/docs/touchableopacity.html
 * @gif: https://media.giphy.com/media/xULW8AMIgw7l31zjm8/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/src/components/touchableOpacity/index.js
 */
export default class TouchableOpacity extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
        const throttleTime = props.throttleTime ||
            ThemeManager.components.TouchableOpacity.throttleTime;
        const throttleOptions = props.throttleOptions ||
            ThemeManager.components.TouchableOpacity.throttleOptions;
        this.onPress = _.throttle(this.onPress.bind(this), throttleTime, throttleOptions);
        this.onPressIn = this.onPressIn.bind(this);
        this.onPressOut = this.onPressOut.bind(this);
    }
    onPressIn(...args) {
        this.setState({
            active: true
        });
        _.invoke(this.props, "onPressIn", ...args);
    }
    onPressOut(...args) {
        this.setState({
            active: false
        });
        _.invoke(this.props, "onPressOut", ...args);
    }
    get backgroundStyle() {
        const { active } = this.state;
        const { activeBackgroundColor } = this.props;
        if (active && activeBackgroundColor) {
            return { backgroundColor: activeBackgroundColor };
        }
    }
    render() {
        const { throttle, ...others } = this.getThemeProps();
        return (<RNTouchableOpacity {...others} onPress={this.onPress} onPressIn={this.onPressIn} onPressOut={this.onPressOut} style={[this.props.style, this.backgroundStyle]}/>);
    }
    onPress() {
        _.invoke(this.props, "onPress");
    }
}
TouchableOpacity.displayName = "TouchableOpacity";
