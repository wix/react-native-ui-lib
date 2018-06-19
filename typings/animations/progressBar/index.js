import React from "react";
import { BaseComponent } from "../../commons";
import View from "../../components/view";
import AnimatedScanner from "../animatedScanner";
import { Colors } from "../../style";
/**
 * @description: Animated progress bar
 * @gif:https://media.giphy.com/media/3o752o08oY0oCvOxR6/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/animationScreens/ProgressBarScreen.js
 */
export default class ProgressBar extends BaseComponent {
    render() {
        const { height, backgroundColor, progressBackgroundColor } = this.props;
        const animatedScannerProps = AnimatedScanner.extractOwnProps(this.props);
        const modifiers = this.extractModifierProps();
        return (<View height={height} {...modifiers} style={{ backgroundColor }}>
        <AnimatedScanner {...animatedScannerProps} backgroundColor={progressBackgroundColor} hideScannerLine/>
      </View>);
    }
}
ProgressBar.displayName = "ProgressBar";
ProgressBar.defaultProps = {
    backgroundColor: Colors.dark60,
    progressBackgroundColor: Colors.dark10
};
