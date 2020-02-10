import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {Colors, Typography, ThemeManager} from '../../style';
import {Constants} from '../../helpers';
import {BaseComponent} from '../../commons';
import View from '../../components/view';
import Text from '../../components/text';

/**
 * @description: Component that shows a full screen with an activity indicator
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreenScreens/LoadingScreen.js
 */
export default class LoaderScreen extends BaseComponent {
  static displayName = 'LoaderScreen';

  static propTypes = {
    ...ActivityIndicator.propTypes,
    /**
     * Color of the loading indicator
     */
    loaderColor: PropTypes.string,
    /**
     * Color of the loader background (only when passing 'overlay')
     */
    backgroundColor: PropTypes.string,
    /**
     * loader message
     */
    message: PropTypes.string,
    /**
     * message style
     */
    messageStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * Show the screen as an absolute overlay
     */
    overlay: PropTypes.bool
    /**
     * Custom container style
     */
  };

  render() {
    const {message, messageStyle, loaderColor, overlay, backgroundColor, containerStyle, ...others} = this.props;

    return (
      <View style={[overlay ? [styles.overlayContainer, {backgroundColor}] : styles.container, containerStyle]}>
        <View flex center>
          <ActivityIndicator
            size={'large'}
            animating
            color={loaderColor || (Constants.isIOS ? Colors.dark60 : ThemeManager.primaryColor)}
            {...others}
          />
          {!overlay && message && <Text style={[styles.message, messageStyle]}>{message}</Text>}
        </View>
      </View>
    );
  }
}

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
    color: Colors.dark10
  }
});
