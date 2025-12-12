import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Colors, Constants, SegmentedControl, SchemeType} from 'react-native-ui-lib';

const SCHEME_TYPES: {label: string; value: SchemeType}[] = [
  {label: 'device (default)', value: 'default'},
  {label: 'dark', value: 'dark'},
  {label: 'light', value: 'light'}
];

const DEVICE_DARK_MODE_MESSAGE = Constants.isIOS
  ? 'Change to dark mode in simulator by pressing Cmd+Shift+A'
  : 'Change to dark mode';
const MANUAL_DARK_MODE_MESSAGE = 'Setting the scheme manually will ignore device settings';

class DarkModeScreen extends Component {
  state = {
    selectedSchemeType: 'default'
  };

  changeSchemeType = (index: number) => {
    Colors.setScheme(SCHEME_TYPES[index].value);
    this.setState({selectedSchemeType: SCHEME_TYPES[index].value});
  };

  render() {
    const {selectedSchemeType} = this.state;
    const message = selectedSchemeType === 'default' ? DEVICE_DARK_MODE_MESSAGE : MANUAL_DARK_MODE_MESSAGE;

    return (
      <View flex padding-page bg-screenBG>
        <Text h1 textColor>
          Dark Mode
        </Text>
        <SegmentedControl
          containerStyle={{alignSelf: 'flex-start', marginTop: 20}}
          segments={SCHEME_TYPES}
          onChangeIndex={this.changeSchemeType}
        />

        <Text marginT-s2 body textColor>
          {message}
        </Text>

        <View style={styles.moonOrSun} bg-moonOrSun/>
        <View style={[styles.mountain, styles.mountainBackground]} bg-mountainBackground/>
        <View style={[styles.mountain, styles.mountainForeground]} bg-mountainForeground/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mountain: {
    position: 'absolute',
    width: 1000,
    height: 1000,
    borderRadius: 500
  },
  mountainForeground: {
    left: -500,
    bottom: -800
  },
  mountainBackground: {
    right: -500,
    bottom: -850
  },
  moonOrSun: {
    position: 'absolute',
    right: 50,
    bottom: 350,
    width: 100,
    height: 100,
    borderRadius: 50
  }
});

export default DarkModeScreen;
