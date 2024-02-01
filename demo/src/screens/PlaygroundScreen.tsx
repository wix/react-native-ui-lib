import React, {Component} from 'react';
import {View, Text, TabController} from 'react-native-ui-lib';

const TABS = [
  {id: 'tab1', label: 'Tab 1'},
  {id: 'tab2', label: 'Tab 2'},
  {id: 'tab3', label: 'Tab 3'}
];

export default class PlaygroundScreen extends Component {
  state = {
    selectedTabIndex: 0
  };

  setSelectedTabIndex = (index: number) => {
    this.setState({selectedTabIndex: index});
  };

  render() {
    const {selectedTabIndex} = this.state;
    return (
      <View flex>
        <TabController asCarousel items={TABS} initialIndex={selectedTabIndex} onChangeIndex={this.setSelectedTabIndex}>
          <TabController.TabBar/>
          <TabController.PageCarousel>
            {TABS.map((tab, index) => (
              <TabController.TabPage key={tab.id} index={index} lazy={index !== 0}>
                <View flex center>
                  <Text>{tab.label}</Text>
                </View>
              </TabController.TabPage>
            ))}
          </TabController.PageCarousel>
        </TabController>
      </View>
    );
  }
}
