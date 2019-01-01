import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Text, Typography, Colors} from 'react-native-ui-lib';//eslint-disable-line

export default class TypographyScreen extends Component {

  render() {
    return (
      <ScrollView style={styles.container}>
        {_.map(Typography, (value, key) => {
          return (
            <View key={key} style={styles.typographyEntry}>
              <Text dark10 style={value}>
                {key}
              </Text>
              <Text dark10 style={[{fontSize: 12, color: Colors.dark50, marginTop: -1}]}>
                font size of {value.fontSize}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
  },
  typographyEntry: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderColor: Colors.dark70,
    borderBottomWidth: 1,
  },
});
