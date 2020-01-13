import React, {Component} from 'react';
import {Colors, TouchableOpacity, Typography, View, Text} from 'react-native-ui-lib'; //eslint-disable-line
import {pushScreen} from '../../../navigation';

import './InputsScreen';
import './InputValidationsScreen';
import './CustomInputsScreen';

const SCREENS = [
  {title: 'Inputs', name: 'unicorn.components.InputsScreen'},
  {title: 'Custom Inputs', name: 'unicorn.components.CustomInputsScreen'},
  {title: 'Validations', name: 'unicorn.components.InputValidationsScreen'}
];

class TextFieldScreen extends Component {
  state = {};
  render() {
    return (
      <View flex>
        {SCREENS.map(({title, name}) => {
          return (
            <TouchableOpacity
              key={title}
              paddingH-20
              paddingV-s4
              style={{borderWidth: 1, borderColor: Colors.grey60}}
              onPress={() => {
                pushScreen({componentId: this.props.componentId, title, name});
              }}
            >
              <Text text60>{title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

export default TextFieldScreen;
