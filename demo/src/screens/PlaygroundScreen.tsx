import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  Assets,
  Colors,
  View,
  Text,
  Card,
  TextField,
  Button,
  Incubator
} from 'react-native-ui-lib'; //eslint-disable-line

export default class PlaygroundScreen extends Component {
  render() {
    return (
      <View bg-dark80 flex padding-20>
        <Incubator.TextField
          label="Email"
          placeholder="Enter email"
          leadingIcon={{source: Assets.icons.demo.search}}
          trailingIcon={{source: Assets.icons.demo.refresh}}
          validationMessage="Email is invalid"
          // style={{borderWidth: 2}}
          fieldStyle={{
            borderWidth: 1,
            padding: 4,
            marginVertical: 4,
            borderRadius: 4,
            borderColor: Colors.grey40
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
