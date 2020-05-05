import React, {Component} from 'react';
import {Colors, TouchableOpacity, Typography, View, Text, TabController} from 'react-native-ui-lib'; //eslint-disable-line
import _ from 'lodash';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

import BasicTextFieldScreen from './BasicTextFieldScreen';
import InputValidationsScreen from './InputValidationsScreen';
import CustomInputsScreen from './CustomInputsScreen';
import InputsScreen from './InputsScreen';

const SCREENS = [
  {title: 'KitchenSink', screen: BasicTextFieldScreen},
  {title: 'Validations', screen: InputValidationsScreen},
  {title: 'Custom Inputs', screen: CustomInputsScreen},
  {title: 'Examples', screen: InputsScreen}
];

class TextFieldScreen extends Component {
  state = {};

  renderPages() {
    return (
      <View flex>
        {_.map(SCREENS, (item, index) => {
          const Screen = item.screen;
          return (
            <TabController.TabPage key={`${item.title}_page`} index={index}>
              <Screen/>
            </TabController.TabPage>
          );
        })}
      </View>
    );
  }

  render() {
    return (
      <TabController>
        <TabController.TabBar
          items={SCREENS.map(item => ({label: item.title}))}
          activeBackgroundColor={Colors.blue70}
        />
        {this.renderPages()}
      </TabController>
    );
  }
}

export default gestureHandlerRootHOC(TextFieldScreen);
