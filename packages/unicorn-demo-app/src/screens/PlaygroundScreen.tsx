import React, {Component} from 'react';
import {View, Text, Card, TextField, Button} from 'react-native-ui-lib';

export default class PlaygroundScreen extends Component {
  render() {
    return (
      <View bg-grey80 flex padding-20>
        <View marginT-20>
          <TextField migrate placeholder="Placeholder"/>
        </View>
        <Card height={100} center padding-20>
          <Text text50>Playground Screen</Text>
        </Card>
        <View flex center>
          <Button marginV-20 label="Button"/>
        </View>
      </View>
    );
  }
}
