import React from "react";
import { View, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { Colors } from "../../style";
import { BaseComponent } from "../../commons";
import TouchableOpacity from "../../components/touchableOpacity";
import ListItemPart from "./ListItemPart";
/**
 * @description: List item component to render inside a ListView component
 * @extends: TouchableOpacity
 * @extendslink: docs/TouchableOpacity
 * @gif: https://media.giphy.com/media/l1IBjHowyPcOTWAY8/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/listScreens/BasicListScreen.js
 */
class ListItem extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            pressed: false
        };
    }
    generateStyles() {
        this.styles = createStyles(this.props);
    }
    render() {
        const { containerElement, containerStyle, style, onPress, onLongPress, underlayColor, testID, ...others } = this.props;
        const { pressed } = this.state;
        // const containerStyle = this.extractContainerStyle(this.props);
        const animationProps = this.extractAnimationProps();
        const Container = onPress || onLongPress ? containerElement : View;
        const pressedStyle = { backgroundColor: underlayColor };
        return (<Container activeOpacity={1} style={[this.styles.container, containerStyle]} onPress={onPress} onLongPress={onLongPress} onHideUnderlay={() => this.setState({ pressed: false })} onShowUnderlay={() => this.setState({ pressed: true })} testID={testID} {...others}>
        <Animatable.View {...animationProps} style={[this.styles.innerContainer, style, pressed && pressedStyle]}>
          {this.props.children}
        </Animatable.View>
      </Container>);
    }
}
ListItem.displayName = "ListItem";
ListItem.defaultProps = {
    height: 63,
    containerElement: TouchableOpacity,
    underlayColor: Colors.dark70
};
function createStyles({ height }) {
    return StyleSheet.create({
        container: {
            backgroundColor: Colors.white
        },
        innerContainer: {
            flexDirection: "row",
            height
        }
    });
}
ListItem.Part = ListItemPart;
export default ListItem;
