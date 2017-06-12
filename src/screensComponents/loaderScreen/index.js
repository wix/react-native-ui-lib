import React from 'react';
import PropTypes from 'prop-types';
import {View, ActivityIndicator} from 'react-native';
import {Colors, Typography, ThemeManager} from '../../style';
import * as Constants from '../../helpers/Constants';
import {BaseComponent} from '../../commons';
import Text from '../../components/text';

/**
 * Component that shows a full screen with an activity indicator
 */
export default class LoaderScreen extends BaseComponent {

  static displayName = 'LoaderScreen';

  static propTypes = {
    ...ActivityIndicator.propTypes,
    /**
     * Color of the loading indicator
     */
    loaderColor: React.PropTypes.string,
    /**
     * loader message
     */
    message: PropTypes.string,
    /**
     * message style
     */
    messageStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  };

  render() {
    const {message, messageStyle, loaderColor, ...others} = this.props;
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size={'large'}
          animating
          color={loaderColor || (Constants.isIOS ? Colors.dark60 : ThemeManager.primaryColor)}
          {...others}
        />
        {message && <Text style={[styles.message, messageStyle]}>{message}</Text>}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    ...Typography.text70,
    marginTop: 18,
    color: Colors.dark10,
  },
};
