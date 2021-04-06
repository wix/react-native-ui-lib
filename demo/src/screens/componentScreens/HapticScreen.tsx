import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {View, Text, Button, HapticService} from 'react-native-ui-lib';

export default class HapticScreen extends Component {
  onPress = ({method}: {method: string}) => {
    HapticService.triggerHaptic(method, 'HapticScreen');
  };

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
        <View padding-20>
          <Text text30 dark10 marginB-20>
            Haptic Screen
          </Text>

          {_.map(HapticService.HapticMethods, method => {
            return <Button marginV-8 marginH-60 label={method} key={method} onPress={() => this.onPress({method})}/>;
          })}
        </View>
      </ScrollView>
    );
  }
}
