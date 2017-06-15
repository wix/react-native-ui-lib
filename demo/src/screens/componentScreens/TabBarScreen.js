import React, { Component } from 'react';
import _ from 'lodash';
import {TabBar, View, Text} from 'react-native-ui-lib'; //eslint-disable-line

export default class TabBarScreen extends Component {
  state = {
    snippet: '',
  }

  componentDidMount() {
    const snippet = this.tabbar.getSnippet();
    this.setState({
      snippet,
    });
  }

  render() {
    const {snippet} = this.state;

    return (
      <View flex bg-dark80>
        <View padding-18>
          <Text text30 dark10>TabBar</Text>
        </View>

        <TabBar selectedIndex={1} ref={element => this.tabbar = element}>
          <TabBar.Item label="FEED" onPress={() => alert('pressed on FEED tab')}/>
          <TabBar.Item label="SERVICES"/>
          <TabBar.Item label="CHAT"/>
          <TabBar.Item label="ABOUT"/>
        </TabBar>

        <View padding-12 bg-dark20 marginT-5>
          <Text white>
            {snippet}
          </Text>
        </View>
      </View>
    );
  }
}
