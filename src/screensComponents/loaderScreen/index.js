import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, ActivityIndicator} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Colors, Typography, ThemeManager} from '../../style';
import * as Constants from '../../helpers/Constants';
import {BaseComponent} from '../../commons';
import Text from '../../components/text';
import View from '../../components/view';

/**
 * @description: Component that shows a full screen with an activity indicator
 * @extends: Animatable.View
 * @gif: https://media.giphy.com/media/3o75212iau1oK8hznG/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/LoadingScreen.js
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
    overlay: PropTypes.bool,
  };

  render() {
    const {message, messageStyle, loaderColor, overlay, ...others} = this.props;
    const animationProps = this.extractAnimationProps();
    return (
      <Animatable.View
        style={[overlay ? styles.overlayContainer : styles.container]}
        {...animationProps}
      >
        <View flex center>
          <ActivityIndicator
            size={'large'}
            animating
            color={loaderColor || (Constants.isIOS ? Colors.dark60 : ThemeManager.primaryColor)}
            {...others}
          />
          {message && <Text style={[styles.message, messageStyle]}>{message}</Text>}
        </View>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.rgba(Colors.white, 0.85),
    zIndex: 100,
  },
  message: {
    ...Typography.text70,
    marginTop: 18,
    color: Colors.dark10,
  },
});
