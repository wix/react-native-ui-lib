import React, {Component} from 'react';
import {Incubator, Colors, View, Text, Image, Assets} from 'react-native-ui-lib'; //eslint-disable-line
import _ from 'lodash';

class TabControllerScreen extends Component {
  state = {
    selectedIndex: 0,
    tabsCount: 2,
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
      <Incubator.TabController.TabBarItem key="about" label="about" onPress={() => console.warn('press about')} />,
      <Incubator.TabController.TabBarItem key="events" label="events" />,
      <Incubator.TabController.TabBarItem key="services" label="services" />,
      <Incubator.TabController.TabBarItem key="account" label="account" badge={{label: '9'}} />,
      <Incubator.TabController.TabBarItem key="groups" label="groups" />,
      <Incubator.TabController.TabBarItem key="blog" label="blog" />,
    ];

    return [
      ..._.take(tabs, tabsCount),
      <Incubator.TabController.TabBarItem key="addTabs" icon={Assets.icons.settings} ignore onPress={this.addTab} />,
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
                <View flex>
                  <Text text40>ABOUT</Text>
                  <Image
                    style={{flex: 1}}
                    source={{
                      uri:
                        'https://images.unsplash.com/photo-1553969923-bbf0cac2666b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
                    }}
                  />
                </View>
              </Incubator.TabController.TabPage>
              <Incubator.TabController.TabPage index={1} lazy>
                <Text text40>EVENTS</Text>
                <Image
                  style={{flex: 1}}
                  source={{
                    uri:
                      'https://images.unsplash.com/photo-1551376347-075b0121a65b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80',
                  }}
                />
              </Incubator.TabController.TabPage>
              <Incubator.TabController.TabPage index={2}>
                <Text text40>SERVICES</Text>
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
