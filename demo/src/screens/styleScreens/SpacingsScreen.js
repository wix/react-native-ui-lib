import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {View, Text, Spacings} from 'react-native-ui-lib'; //eslint-disable-line


export default class SpacingsScreen extends Component {
  
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View padding-18>
          <Text text30 dark10 marginB-20>Spacings</Text>
          <View>
            {_.map(Spacings, (value, key) => {
              if (!_.isNumber(value)) {
                return;
              }
              
              return (
                <View key={key} marginB-12>
                  <View row spread bottom>
                    <Text text60 dark10>{key}</Text>
                    <Text dark30 text90>{value}</Text>
                  </View>
                  <View height={value} bg-red80 right/>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    );
  }
}
