import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {View, Text, Button, HapticService, HapticType} from 'react-native-ui-lib';

export default class HapticScreen extends Component {
  onPress = ({hapticType}: {hapticType: HapticType}) => {
    HapticService.triggerHaptic(hapticType, 'HapticScreen');
  };

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
        <View padding-20>
          <Text text30 dark10 marginB-20>
            Haptic Screen
          </Text>

          {_.map(HapticService.HapticType, hapticType => {
            return <Button marginV-8 marginH-60 label={hapticType} key={hapticType} onPress={() => this.onPress({hapticType})}/>;
          })}
        </View>
      </ScrollView>
    );
  }
}
