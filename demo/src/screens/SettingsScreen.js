import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, AsyncStorage, I18nManager} from 'react-native';
import {Colors, View, Text, Picker, Toast, Switch} from 'react-native-ui-lib'; //eslint-disable-line
import {navigationData} from './MenuStructure';


const none = {label: '[None]', value: ''};
const playgroundScreen = {label: 'Playground', value: 'unicorn.PlaygroundScreen'};

class SettingsScreen extends Component {
  constructor(props) {
    super(props);

    const data = props.navigationData || navigationData;
    const playground = props.playground || playgroundScreen;
    
    this.state = {
      showRefreshMessage: false,
      screens: [
        none,
        playground,
        ..._.chain(data)
          .values()
          .map('screens')
          .flatten()
          .map(screen => ({label: screen.title, value: screen.screen}))
          .value()
      ]
    };
  }

  async componentWillMount() {
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

  setDefaultScreen = (screen) => {
    this.setState({defaultScreen: screen});
    AsyncStorage.setItem('uilib.defaultScreen', screen.value);
    setTimeout(() => {
      this.setState({showRefreshMessage: true});
    }, 1000);
  };

  render() {
    const {defaultScreen, showRefreshMessage, isRTL} = this.state;

    return (
      <View flex padding-25 bg-grey80>
        <View flex>
          <Text text60>Default Screen</Text>
          <Text text70 marginB-20>
            Set default screen to open on app startup
          </Text>
          <Picker
            placeholder="Pick default screen..."
            showSearch
            value={defaultScreen}
            onChange={this.setDefaultScreen}
          >
            {_.map(this.state.screens, screen => (
              <Picker.Item key={screen.value} value={screen}/>
            ))}
          </Picker>

          <View style={{borderWidth: 1, borderColor: Colors.dark70, marginTop: 40}}>
            <View style={[{padding: 5, borderBottomWidth: 1}, styles.block]}>
              <Text text80 dark20>Current layout direction</Text>
            </View>
            <View center margin-5 padding-10>
              <Text text70>{isRTL ? 'RIGHT to LEFT' : 'LEFT to RIGHT'}</Text>
            </View>

            <View row spread centerV style={[{padding: 12, borderTopWidth: 1}, styles.block]}>
              <Switch
                value={isRTL}
                onValueChange={this.onDirectionChange}
              />
              <Text text80 dark20>Force RTL</Text>
            </View>
          </View>
        </View>

        <Text text30 dark10>Settings</Text>
        <Toast visible={showRefreshMessage} position="bottom" message="Refresh the app!"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  block: {
    borderColor: Colors.dark70,
    backgroundColor: Colors.dark80
  }
});

export default SettingsScreen;
