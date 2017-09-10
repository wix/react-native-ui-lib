import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import _ from 'lodash';
import {View, Text, Colors, Spacings} from 'react-native-ui-lib'; //eslint-disable-line

class SpacingsScreen extends Component {
  state = {};
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View padding-18>
          <Text text30 dark10 marginB-20>Spacings</Text>
          <View>
            {_.map(Spacings, (value, key) => {
              return (
                <View key={key} marginB-12>
                  <View row spread bottom>
                    <Text text60 dark10>
                      {key}
                    </Text>
                    <Text dark30 text90>{value}</Text>
                  </View>
                  <View height={value} bg-red80 right />
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default SpacingsScreen;
