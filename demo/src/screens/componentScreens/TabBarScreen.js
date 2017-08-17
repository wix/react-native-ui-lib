import React, {Component} from 'react';
import _ from 'lodash';
import {TabBar, View, Text} from 'react-native-ui-lib'; //eslint-disable-line

export default class TabBarScreen extends Component {
  state = {
    snippet: '',
    selectedIndex: 1,
  };

  componentDidMount() {
    const snippet = this.tabbar.getSnippet();
    this.setState({
      snippet,
    });
  }

  render() {
    const {snippet, selectedIndex} = this.state;

    return (
      <View flex bg-dark80>
        <View padding-18>
          <Text text30 dark10>
            TabBar
          </Text>
        </View>

        <TabBar
          selectedIndex={selectedIndex}
          onChangeIndex={index => this.setState({selectedIndex: index})}
          ref={element => (this.tabbar = element)}
        >
          <TabBar.Item label="FEED" />
          <TabBar.Item label="SERVICES" />
          <TabBar.Item label="CHAT" />
          <TabBar.Item>
            <Text text90 purple30={selectedIndex === 3}>ABOUT</Text>
          </TabBar.Item>
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
