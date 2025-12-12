import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, I18nManager} from 'react-native';
import {Colors, View, Text, Picker, Incubator, Switch, Spacings} from 'react-native-ui-lib'; //eslint-disable-line
import {navigationData} from './MenuStructure';
import Storage, {DEFAULT_SCREEN, IS_RTL} from '../storage';

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
      isRTL: false,
      screens
    };
  }

  UNSAFE_componentWillMount() {
    const {screens} = this.state;
    const defaultScreenId = Storage.getString(DEFAULT_SCREEN);
    const defaultScreen = _.find(screens, {value: defaultScreenId});

    const isRTL = Storage.getBoolean(IS_RTL);

    this.setState({defaultScreen, isRTL});
  }

  onDirectionChange = () => {
    this.setState({isRTL: !this.state.isRTL}, () => {
      I18nManager.forceRTL(this.state.isRTL);
      Storage.set(IS_RTL, this.state.isRTL);
      setTimeout(() => {
        this.setState({showRefreshMessage: true});
      }, 1000);
    });
  };

  setDefaultScreen = screen => {
    this.setState({defaultScreen: screen});
    Storage.set(DEFAULT_SCREEN, screen);
    setTimeout(() => {
      this.setState({showRefreshMessage: true});
    }, 1000);
  };

  render() {
    const {defaultScreen, showRefreshMessage, isRTL, screens} = this.state;
    const {extraSettingsUI} = this.props;
    const filteredScreens = _.filter(screens, screen => !_.isUndefined(screen.value));

    const _extraSettingsUI = extraSettingsUI?.();

    return (
      <View flex padding-25 bg-grey80>
        <Text text40 marginB-s5>
          Settings
        </Text>

        <View style={styles.block}>
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
            items={filteredScreens}
          />
        </View>

        <View style={styles.block} marginT-s4>
          <View row spread centerV>
            <Text text80 grey20>
              Force RTL
            </Text>
            <Switch value={isRTL} onValueChange={this.onDirectionChange}/>
          </View>

          <View center marginT-5>
            <Text text70>{isRTL ? 'RIGHT to LEFT' : 'LEFT to RIGHT'}</Text>
          </View>
        </View>

        {_extraSettingsUI && (
          <View marginT-s4 style={styles.block}>
            {_extraSettingsUI}
          </View>
        )}

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
    borderWidth: 1,
    borderColor: Colors.$outlineNeutral,
    backgroundColor: Colors.grey80,
    padding: Spacings.s3
  }
});

export default SettingsScreen;
