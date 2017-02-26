import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {BorderRadiuses, Typography, Colors} from 'react-native-ui-lib';//eslint-disable-line

export default class ColorsScreen extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Border Radius</Text>
        <View style={styles.squaresContainer}>
          {_.map(BorderRadiuses, (value, key) => {
            const useWideSquare = value > 100;
            return (
              <View key={key} style={[styles.square, {borderRadius: value}, useWideSquare && styles.wideSquare]}>
                <Text style={styles.squareText}>
                  {key}
                </Text>
                <View style={styles.floatingValue}>
                  <Text style={[styles.squareText, {...Typography.text80, width: 100}]}>
                    {value}pt
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const FLOATING_VALUE_BOX_SIZE = 38;
const SQUARE_SIZE = 55;
const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    alignItems: 'center',
  },
  title: {
    color: Colors.dark10,
    ...Typography.text30,
    marginBottom: 35,
  },
  squaresContainer: {
    alignItems: 'center',
  },
  square: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    backgroundColor: Colors.dark80,
    marginVertical: 25,
    marginHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wideSquare: {
    width: SQUARE_SIZE * 2,
  },
  squareText: {
    ...Typography.text70,
    color: Colors.dark10,
    backgroundColor: 'transparent',
  },
  floatingValue: {
    position: 'absolute',
    right: -FLOATING_VALUE_BOX_SIZE + 12,
    top: -FLOATING_VALUE_BOX_SIZE + 12,
    width: FLOATING_VALUE_BOX_SIZE,
    height: FLOATING_VALUE_BOX_SIZE,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.dark70,
    paddingLeft: 12,
    paddingBottom: 12,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
});
