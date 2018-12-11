import _ from 'lodash';
import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {View, Text, Picker, Toast} from 'react-native-ui-lib'; //eslint-disable-line
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
          .value(),
      ],
    };
  }

  async componentWillMount() {
    const {screens} = this.state;
    const defaultScreenId = await AsyncStorage.getItem('uilib.defaultScreen');
    const defaultScreen = _.find(screens, {value: defaultScreenId});
    
    this.setState({
      defaultScreen,
    });
  }

  setDefaultScreen = (screen) => {
    this.setState({defaultScreen: screen});
    AsyncStorage.setItem('uilib.defaultScreen', screen.value);
    setTimeout(() => {
      this.setState({showRefreshMessage: true});
    }, 1000);
  };

  render() {
    const {defaultScreen, showRefreshMessage} = this.state;
    
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
        </View>
        <Text titleHuge>Settings</Text>
        <Toast visible={showRefreshMessage} position="bottom" message="Refresh the app!"/>
      </View>
    );
  }
}

export default SettingsScreen;
