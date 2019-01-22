import React, { Component } from 'react';
import {View, Text, TouchableOpacity} from 'react-native-ui-lib'; //eslint-disable-line

export default class TouchableOpacityScreen extends Component {

  state = {
    count: 0,
  }

  componentDidMount() {
    const snippet = this.example.getSnippet();
    this.setState({
      snippet,
    });
  }

  count() {
    this.setState({
      count: this.state.count + 1,
    });
  }

  render() {
    return (
      <View flex bg-dark70 useSafeArea>
        <View flex center>
          <View marginB-20>
            <Text center>
              TouchableOpacity with support for throttling.
            </Text>
            <Text center>
              In this example, throttleTime is set to 1200
            </Text>
          </View>
          <TouchableOpacity
            throttleTime={1200}
            onPress={() => this.count()}
            ref={element => this.example = element}
          >
            <Text text40>
              Click Me!
            </Text>
          </TouchableOpacity>
          <View center marginT-20>
            <Text text20>
              {this.state.count}
            </Text>
          </View>
        </View>
        <View bg-dark10 margin-10 padding-10>
          <Text white>
            {this.state.snippet}
          </Text>
        </View>
      </View>
    );
  }
}
