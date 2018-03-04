import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Colors, Constants, View, TabBar, Text} from 'react-native-ui-lib'; //eslint-disable-line

export default class PlaygroundScreen extends Component {

  static id = 'example.Playground';

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 1,
    };
  }

  componentDidMount() {
  }

  render() {
    const {selectedIndex} = this.state;

    return (
      <View flex style={styles.container}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark80,
  },
});
