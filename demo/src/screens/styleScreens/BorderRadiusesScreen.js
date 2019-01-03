import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {BorderRadiuses, View, Text, Typography, Colors} from 'react-native-ui-lib'; //eslint-disable-line

export default class ColorsScreen extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text text30 dark10 marginB-20>
          Border Radius
        </Text>
        <View>
          {_.map(BorderRadiuses, (value, key) => {
            return (
              <View center key={key} height={150} width={150}>
                <View style={styles.labelContainer}>
                  <Text dark30 text50>
                    {key}
                  </Text>
                  <Text dark30 text70>
                    ({value})
                  </Text>
                </View>
                <View style={{borderRadius: value}} bg-yellow30 width='40%' height='40%' />
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    alignItems: 'center',
    backgroundColor: Colors.dark80,
  },
  labelContainer: {
    position: 'absolute',
    top: 5,
    left: 5,
  },
});
