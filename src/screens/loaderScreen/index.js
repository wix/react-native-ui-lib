import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {Colors, ThemeManager} from '../../style';
import * as Constants from '../../helpers/Constants';

/**
 * Component that shows a full screen with an activity indicator
 */
const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator size={'large'} animating color={Constants.isIOS ? Colors.dark60 : ThemeManager.primaryColor} />
  </View>
);

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default Loader;
