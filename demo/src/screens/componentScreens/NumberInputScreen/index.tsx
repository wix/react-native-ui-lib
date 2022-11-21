import React, {Component} from 'react';
import {Colors, View, TabController} from 'react-native-ui-lib';
import _ from 'lodash';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

import NumberInputProcessButtonScreen from './NumberInputProcessButtonScreen';
import NumberInputErrorOnChangeScreen from './NumberInputErrorOnChangeScreen';

const SCREENS = [
  {title: 'Process button', screen: NumberInputProcessButtonScreen},
  {title: 'Error on change', screen: NumberInputErrorOnChangeScreen}
];

class NumberInputScreen extends Component {
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
      <TabController items={SCREENS.map(item => ({label: item.title}))}>
        <TabController.TabBar activeBackgroundColor={Colors.blue70}/>
        {this.renderPages()}
      </TabController>
    );
  }
}

export default gestureHandlerRootHOC(NumberInputScreen);
