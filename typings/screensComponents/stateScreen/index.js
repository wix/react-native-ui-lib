import React from "react";
import _ from "lodash";
import { StyleSheet, Text, View, Image } from "react-native";
import * as Constants from "../../helpers/Constants";
import { Typography, ThemeManager } from "../../style";
import { BaseComponent } from "../../commons";
import TouchableOpacity from "../../components/touchableOpacity";
/**
 * @description: Component that shows a full screen for a certain state, like an empty state
 * @image: https://user-images.githubusercontent.com/33805983/34672894-f262ab84-f488-11e7-83f0-4ee0f0ac34ba.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/EmptyStateScreen.js
 */
export default class StateScreen extends BaseComponent {
    generateStyles() {
        const { imageSource } = this.props;
        const isRemoteImage = _.isObject(imageSource) && Boolean(imageSource.uri);
        this.styles = createStyles(isRemoteImage);
    }
    render() {
        const { title, subtitle, imageSource, ctaLabel, onCtaPress, testId } = this.props;
        return (<View style={this.styles.container} testID={testId}>
        <View>
          <Image style={this.styles.image} resizeMode={"contain"} source={imageSource}/>
        </View>
        <View>
          <Text style={[this.styles.title]}>{title}</Text>
          <Text style={[this.styles.subtitle]}>{subtitle}</Text>
        </View>
        <View style={this.styles.cta}>
          <TouchableOpacity onPress={onCtaPress}>
            <Text style={this.styles.ctaLabel}>
              {Constants.isAndroid ? _.toUpper(ctaLabel) : ctaLabel}
            </Text>
          </TouchableOpacity>
        </View>
      </View>);
    }
}
StateScreen.displayName = "StateScreen";
function createStyles(isRemoteImage) {
    const imageStyle = _.merge({ height: 200 }, isRemoteImage && { width: Constants.screenWidth * 0.9 });
    return StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 80,
            justifyContent: "flex-start",
            alignItems: "center"
        },
        image: imageStyle,
        title: {
            textAlign: "center",
            ...Typography.text50,
            color: ThemeManager.titleColor,
            fontWeight: "300"
        },
        subtitle: {
            textAlign: "center",
            ...Typography.text70,
            color: ThemeManager.subtitleColor,
            fontWeight: "300",
            marginTop: 12
        },
        cta: {
            marginTop: 30
        },
        ctaLabel: {
            color: ThemeManager.primaryColor,
            ...Typography.text70
        }
    });
}
