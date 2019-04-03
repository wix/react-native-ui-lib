import React, {Component} from 'react';
import {Incubator, View, Text, Image, Assets} from 'react-native-ui-lib'; //eslint-disable-line
import _ from 'lodash';

class TabControllerScreen extends Component {
  state = {};

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

  render() {
    return (
      <View flex bg-dark80>
        <View flex>
          <Incubator.TabController selectedIndex={2} _onChangeIndex={index => console.warn('tab index is', index)}>
            <Incubator.TabController.TabBar
              uppercase
              // indicatorStyle={{backgroundColor: 'green', height: 3}}
              // labelColor={'green'}
              // selectedLabelColor={'red'}
              // labelStyle={{fontSize: 20}}
              iconColor={'green'}
              selectedIconColor={'blue'}
            >
              <Incubator.TabController.TabBarItem label="about" onPress={() => console.warn('ethan - press about')} />
              <Incubator.TabController.TabBarItem label="events" />
              <Incubator.TabController.TabBarItem label="services" />
              <Incubator.TabController.TabBarItem label="account" />
              <Incubator.TabController.TabBarItem label="groups" />
              <Incubator.TabController.TabBarItem label="blog" />
              <Incubator.TabController.TabBarItem icon={Assets.icons.settings} />
            </Incubator.TabController.TabBar>
            <View flex>
              <Incubator.TabController.TabPage index={0}>
                <View flex>
                  <Text text40>PAGE 0</Text>
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
                <Text text40>PAGE 1</Text>
                <Image
                  style={{flex: 1}}
                  source={{
                    uri:
                      'https://images.unsplash.com/photo-1551376347-075b0121a65b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80',
                  }}
                />
              </Incubator.TabController.TabPage>
              <Incubator.TabController.TabPage index={2}>
                <Text text40>PAGE 2</Text>
              </Incubator.TabController.TabPage>
            </View>
          </Incubator.TabController>
        </View>
      </View>
    );
  }
}

export default TabControllerScreen;
