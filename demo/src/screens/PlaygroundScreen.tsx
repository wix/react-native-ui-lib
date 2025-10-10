import React, {Component} from 'react';
import {View, Icon, Assets, Colors} from 'react-native-ui-lib';

export default class PlaygroundScreen extends Component {
  render() {
    return (
      <View bg-grey80 flex padding-20>
        <View marginT-20>
          <Icon
            source={Assets.internal.icons.addFlat}
            size={32}
            tintColor={Colors.green30}
            style={{
              borderColor: 'green',
              borderWidth: 1,
              backgroundColor: 'yellow',
              tintColor: 'blue'
            }}
          />
          <Icon
            source={Assets.internal.icons.heart}
            size={32}
            tintColor={Colors.green30}
            style={{
              borderColor: 'green',
              borderWidth: 1,
              backgroundColor: 'yellow',
              tintColor: 'blue'
            }}
          />
        </View>
      </View>
    );
  }
}
