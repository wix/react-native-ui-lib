import React, {Component} from 'react';
import {Incubator, View, Text, Image} from 'react-native-ui-lib'; //eslint-disable-line
import _ from 'lodash';

class TabControllerScreen extends Component {
  state = {};

  componentDidMount() {
    // this.slow();
  }

  slow() {
    setTimeout(() => {
      _.times(5000, () => {
        console.log('ethan - slow logg');
      });

      this.slow();
    }, 10);
  }

  render() {
    return (
      <View flex bg-dark80>
        <View flex>
          <Incubator.TabController onChangeIndex={index => console.warn('ethan - index', index)}>
            <Incubator.TabController.TabBar>
              <Incubator.TabController.TabBarItem label="ABOUT" index={0} />
              <Incubator.TabController.TabBarItem label="EVENTS" index={1} />
              <Incubator.TabController.TabBarItem label="ACCOUNT" index={2} />
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
