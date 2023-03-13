import _ from 'lodash';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, I18nManager} from 'react-native';
import {Colors, View, Text, Picker, Incubator, Switch} from 'react-native-ui-lib'; //eslint-disable-line
import {navigationData} from './MenuStructure';

const none = {label: '[None]', value: ''};

class SettingsScreen extends Component {
  constructor(props) {
    super(props);

    const data = props.navigationData || navigationData;
    const playground = props.playground;

    const screens = [
      none,
      ..._.flow(_.values,
        screens => _.map(screens, 'screens'),
        _.flatten,
        screens => _.map(screens, screen => ({label: screen.title, value: screen.screen})))(data)
    ];

    if (playground) {
      screens.splice(1, 0, playground);
    }

    this.state = {
      showRefreshMessage: false,
      screens
    };
  }

  async UNSAFE_componentWillMount() {
    const {screens} = this.state;
    const defaultScreenId = await AsyncStorage.getItem('uilib.defaultScreen');
    const defaultScreen = _.find(screens, {value: defaultScreenId});

    const isRTLString = await AsyncStorage.getItem('uilib.isRTL');
    const isRTL = isRTLString === 'true';

    this.setState({defaultScreen, isRTL});
  }

  onDirectionChange = () => {
    this.setState({isRTL: !this.state.isRTL}, () => {
      I18nManager.forceRTL(this.state.isRTL);
      AsyncStorage.setItem('uilib.isRTL', `${this.state.isRTL}`);
      setTimeout(() => {
        this.setState({showRefreshMessage: true});
      }, 1000);
    });
  };

  setDefaultScreen = screen => {
    this.setState({defaultScreen: screen});
    AsyncStorage.setItem('uilib.defaultScreen', screen.value);
    setTimeout(() => {
      this.setState({showRefreshMessage: true});
    }, 1000);
  };

  render() {
    const {defaultScreen, showRefreshMessage, isRTL, screens} = this.state;
    const {extraSettingsUI} = this.props;
    const filteredScreens = _.filter(screens, screen => !_.isUndefined(screen.value));

    return (
      <View flex padding-25 bg-grey80>
        <View flex>
          <Text text60>Default Screen</Text>
          <Text text70 marginB-20>
            Set default screen to open on app startup
          </Text>
          <Picker
            testID={'uilib.defaultScreenPicker'}
            placeholder="Pick default screen..."
            showSearch
            value={defaultScreen?.value}
            label={'Default Screen'}
            onChange={this.setDefaultScreen}
            migrateTextField
          >
            {_.map(filteredScreens, screen => (
              <Picker.Item key={screen.value} value={screen.value} label={screen.label}/>
            ))}
          </Picker>

          <View style={{borderWidth: 1, borderColor: Colors.grey70, marginTop: 40}}>
            <View style={[{padding: 5, borderBottomWidth: 1}, styles.block]}>
              <Text text80 grey20>
                Current layout direction
              </Text>
            </View>
            <View center margin-5 padding-10>
              <Text text70>{isRTL ? 'RIGHT to LEFT' : 'LEFT to RIGHT'}</Text>
            </View>

            <View row spread centerV style={[{padding: 12, borderTopWidth: 1}, styles.block]}>
              <Switch value={isRTL} onValueChange={this.onDirectionChange}/>
              <Text text80 grey20>
                Force RTL
              </Text>
            </View>
          </View>

          {extraSettingsUI?.()}
        </View>

        <Text text30 grey10>
          Settings
        </Text>
        <Incubator.Toast
          visible={showRefreshMessage}
          message={`Default screen set to: ${defaultScreen?.label}. Please refresh the app.`}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  block: {
    borderColor: Colors.grey70,
    backgroundColor: Colors.grey80
  }
});

export default SettingsScreen;
