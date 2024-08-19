import React, {Component} from 'react';
import {View, Text, Card, TextField, Button} from 'react-native-ui-lib';

export default class PlaygroundScreen extends Component {
  render() {
    return (
      <View bg-grey80 flex padding-20>
        <Text
          testID="my-test"
          highlightString={[
            {string: 'An', style: {color: 'green'}},
            {string: 'This', style: {color: 'red'}}
          ]}
        >
          {['Is ', 'An ', 'Array ', 'Of ', 'This ', 'Strings']}
        </Text>
      </View>
    );
  }
}
