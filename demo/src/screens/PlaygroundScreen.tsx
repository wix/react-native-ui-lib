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
  input = React.createRef();

  componentDidMount() {
    this.input.current.focus();
  }

  render() {
    return (
      <View bg-dark80 flex padding-20>
        <Incubator.TextField
          ref={this.input}
          label="Email"
          labelColor={'blue'}
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

        <Incubator.TextField
          containerStyle={{marginTop: 30}}
          placeholder="Placeholder"
          label="Label"
          labelColor={{
            default: 'green',
            focus: 'blue',
            disabled: Colors.grey40
          }}
          // editable={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
