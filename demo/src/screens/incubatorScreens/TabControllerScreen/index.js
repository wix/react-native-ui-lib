import _ from 'lodash';
import React, {Component} from 'react';
import {Incubator, Colors, View, Text} from 'react-native-ui-lib'; //eslint-disable-line

import Tab1 from './tab1';
import Tab2 from './tab2';
import Tab3 from './tab3';


const settingsIcon = require('../../../assets/icons/settings.png');

class TabControllerScreen extends Component {
  state = {
    selectedIndex: 0,
    tabsCount: 3,
    key: Date.now(),
  };

  componentDidMount() {
    // this.slow();
  }

  slow() {
    setTimeout(() => {
      _.times(5000, () => {
        console.log('slow log');
      });

      this.slow();
    }, 10);
  }

  addTab = () => {
    const {tabsCount} = this.state;

    if (tabsCount < 6) {
      this.setState({tabsCount: tabsCount + 1, key: Date.now(), selectedIndex: tabsCount});
    }
  };

  getTabs() {
    const {tabsCount} = this.state;
    const tabs = [
      <Incubator.TabController.TabBarItem key="tab1" label="tab1" onPress={() => console.warn('press tab1')} />,
      <Incubator.TabController.TabBarItem key="tab2" label="tab2" />,
      <Incubator.TabController.TabBarItem key="tab3" label="tab3" />,
      <Incubator.TabController.TabBarItem key="account" label="account" badge={{label: '9'}} />,
      <Incubator.TabController.TabBarItem key="groups" label="groups" />,
      <Incubator.TabController.TabBarItem key="blog" label="blog" />,
    ];

    return [
      ..._.take(tabs, tabsCount),
      <Incubator.TabController.TabBarItem key="addTabs" icon={settingsIcon} ignore onPress={this.addTab} />,
    ];
  }

  render() {
    const {key, selectedIndex} = this.state;
    return (
      <View flex bg-dark80>
        <View flex>
          <Incubator.TabController
            key={key}
            selectedIndex={selectedIndex}
            _onChangeIndex={index => console.warn('tab index is', index)}
          >
            <Incubator.TabController.TabBar
              // key={key}
              uppercase
              // indicatorStyle={{backgroundColor: 'green', height: 3}}
              // labelColor={'green'}
              // selectedLabelColor={'red'}
              // labelStyle={{fontSize: 20}}
              // iconColor={'green'}
              // selectedIconColor={'blue'}
              activeBackgroundColor={Colors.blue60}
            >
              {this.getTabs()}
            </Incubator.TabController.TabBar>
            <View flex>
              <Incubator.TabController.TabPage index={0}>
                <Tab1 />
              </Incubator.TabController.TabPage>
              <Incubator.TabController.TabPage index={1} lazy>
                <Tab2 />
              </Incubator.TabController.TabPage>
              <Incubator.TabController.TabPage index={2}>
                <Tab3 />
              </Incubator.TabController.TabPage>
              <Incubator.TabController.TabPage index={3}>
                <Text text40>ACCOUNT</Text>
              </Incubator.TabController.TabPage>
              <Incubator.TabController.TabPage index={4}>
                <Text text40>GROUPS</Text>
              </Incubator.TabController.TabPage>
              <Incubator.TabController.TabPage index={5}>
                <Text text40>BLOG</Text>
              </Incubator.TabController.TabPage>
            </View>
          </Incubator.TabController>
        </View>
      </View>
    );
  }
}

export default TabControllerScreen;
