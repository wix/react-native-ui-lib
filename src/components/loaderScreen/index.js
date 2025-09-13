import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Colors, Typography } from "../../style";
import { Constants, asBaseComponent } from "../../commons/new";
import View from "../../components/view";
import Text from "../../components/text";
import { LoaderScreenProps } from "./types";
class LoaderScreen extends Component {
  static displayName = 'LoaderScreen';
  render() {
    const {
      message,
      messageStyle,
      loaderColor,
      overlay,
      backgroundColor,
      customLoader,
      containerStyle,
      ...others
    } = this.props;
    return <View style={[overlay ? [styles.overlayContainer, {
      backgroundColor
    }] : styles.container, containerStyle]}>
        <View flex center>
          {customLoader || <ActivityIndicator size={'large'} animating color={loaderColor || (Constants.isIOS ? Colors.grey60 : Colors.$iconPrimary)} {...others} />}
          {message && <Text style={[styles.message, messageStyle]}>{message}</Text>}
        </View>
      </View>;
  }
}
export { LoaderScreenProps };
export default asBaseComponent(LoaderScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.rgba(Colors.white, 0.85),
    zIndex: 100
  },
  message: {
    ...Typography.text70,
    marginTop: 18,
    color: Colors.grey10
  }
});