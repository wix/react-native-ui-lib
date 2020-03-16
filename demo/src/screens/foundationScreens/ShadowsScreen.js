import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet, Dimensions} from 'react-native';
import {Colors, Shadows} from 'react-native-ui-lib'; // eslint-disable-line


const {height} = Dimensions.get('window');
const SHAPE_DIAMETER = 80;

const shadowsOverWhiteBkg = _.reduce(Shadows, (results, value, key) => {
  if (key.startsWith('white')) {
    results[key] = value;
  }
  return results;
}, {});

const shadowsOverDarkBkg = _.reduce(Shadows, (results, value, key) => {
  if (key.startsWith('dark')) {
    results[key] = value;
  }
  return results;
}, {});


export default class ShadowsScreen extends Component {

  renderShadows(shadowsList) {
    return []
      .concat(_.map(shadowsList, (value, key) => this.renderCircleWithShadow(value, key)))
      .concat(_.map(shadowsList, (value, key) => this.renderSquareWithShadow(value, key)));
  }

  renderCircleWithShadow(shadow, name) {
    return (
      <View key={`${name}_circle`} style={[styles.shadowCircle, shadow.top]}>
        <View style={[styles.innerCircle, shadow.bottom]}>
          <Text style={styles.shadowLabel}>{name}</Text>
        </View>
      </View>
    );
  }

  renderSquareWithShadow(shadow, name) {
    return (
      <View key={`${name}_square`} style={[styles.shadowSquare, shadow.top]}>
        <View style={[styles.innerSquare, shadow.bottom]}>
          <Text style={styles.shadowLabel}>{name}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View useSafeArea>
        <View style={{flexDirection: 'row', position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}>
          <View style={[styles.subContainer, {backgroundColor: Colors.dark80}]}/>
          <View style={[styles.subContainer, {backgroundColor: Colors.white}]}/>
        </View>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.subContainer}>
              {this.renderShadows(shadowsOverDarkBkg)}
            </View>
            <View style={styles.subContainer}>
              {this.renderShadows(shadowsOverWhiteBkg)}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'column',
    minHeight: 0.8 * height,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shadowCircle: {
    width: SHAPE_DIAMETER,
    height: SHAPE_DIAMETER,
    borderRadius: SHAPE_DIAMETER / 2,
    backgroundColor: 'white',
    margin: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: SHAPE_DIAMETER,
    height: SHAPE_DIAMETER,
    borderRadius: SHAPE_DIAMETER / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  shadowSquare: {
    width: SHAPE_DIAMETER,
    height: SHAPE_DIAMETER,
    borderRadius: 6,
    backgroundColor: 'white',
    margin: 40,
    justifyContent: 'center',
  },
  innerSquare: {
    width: SHAPE_DIAMETER,
    height: SHAPE_DIAMETER,
    borderRadius: 6,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  shadowLabel: {
    fontSize: 9,
    textAlign: 'center',
  },
});
