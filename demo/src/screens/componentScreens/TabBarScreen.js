import React, { Component } from 'react';
import _ from 'lodash';
import {TabBar, View, Text} from 'react-native-ui-lib'; //eslint-disable-line

export default class TabBarScreen extends Component {

  elements = new Array(3);

  state = {
    snippets: new Array(3),
  }

  // componentDidMount() {
  //   const snippets = [];
  //   _.forEach(this.elements, (element) => {
  //     snippets.push(element.getSnippet());
  //   });

  //   this.setState({
  //     snippets,
  //   });
  // }

  render() {
    const {snippets} = this.state;

    return (
      <View flex bg-dark80>
        <View padding-18>
          <Text text30 dark10>TabBar</Text>
        </View>
      
        <TabBar selectedIndex={1} ref={element => this.elements[0] = element}>
          <TabBar.Item label="FEED" onPress={() => alert('pressed on FEED tab')}/>
          <TabBar.Item label="SERVICES"/>
          <TabBar.Item label="CHAT"/>
          <TabBar.Item label="ABOUT"/>
        </TabBar>
      </View>
    );
  }
}
