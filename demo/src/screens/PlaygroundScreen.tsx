import React, {Component} from 'react';
import {View, Text, Card, Avatar, TextField, Button} from 'react-native-ui-lib'; //eslint-disable-line

export default class PlaygroundScreen extends Component {
  render() {
    const badgePos = 'BOTTOM_LEFT';
    return (
      <View bg-grey80 flex padding-20>
        <View marginT-20>
          <TextField migrate placeholder="Placeholder"/>
        </View>
        <Card height={100} center padding-20>
          <Text text50>Playground Screen</Text>
        </Card>
        <View flex center>
          <Button marginV-20 label="Button" style={{alignSelf: 'baseline'}}/>
        </View>
        <Avatar badgePosition={badgePos} source={1}/>
      </View>
    );
  }
}
