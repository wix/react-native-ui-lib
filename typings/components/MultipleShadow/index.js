import React from "react";
import { StyleSheet } from "react-native";
import { BaseComponent } from "../../commons";
import View from "../view";
import { Shadows } from "../../style";
/**
 * @description: A multiple layer for multiple shadow effect for iOS only
 */
export default class MultipleShadow extends BaseComponent {
    generateStyles() {
        this.styles = createStyles(this.props);
    }
    getShadowStyles() {
        const { shadowType } = this.props;
        let { topShadow, bottomShadow } = this.props;
        if (!topShadow && Shadows[shadowType]) {
            topShadow = Shadows[shadowType].top;
        }
        if (!bottomShadow && Shadows[shadowType]) {
            bottomShadow = Shadows[shadowType].bottom;
        }
        return { topShadow, bottomShadow };
    }
    render() {
        const { style, shadowColor, ...others } = this.props;
        const { topShadow, bottomShadow } = this.getShadowStyles();
        return (<View {...others} style={[
            this.styles.wrapper,
            { ...topShadow },
            shadowColor && { shadowColor },
            style
        ]}>
        <View {...others} style={[
            this.styles.wrapper,
            { ...bottomShadow },
            shadowColor && { shadowColor },
            style
        ]}>
          {this.props.children}
        </View>
      </View>);
    }
}
MultipleShadow.displayName = "IGNORE";
MultipleShadow.defaultProps = {
    shadowType: "white40"
};
function createStyles() {
    return StyleSheet.create({
        wrapper: {
            flexGrow: 1
        }
    });
}
