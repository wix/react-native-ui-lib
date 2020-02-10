import React, {Component} from 'react';
import {Colors, TouchableOpacity, Typography, View, Text} from 'react-native-ui-lib'; //eslint-disable-line
import {pushScreen} from '../../../navigation';

import './BasicTextFieldScreen';
import './InputValidationsScreen';
import './CustomInputsScreen';
import './InputsScreen';

const SCREENS = [
  {title: 'TextField Kitchen-Sink', name: 'unicorn.components.BasicTextFieldScreen'},
  {title: 'Custom Inputs', name: 'unicorn.components.CustomInputsScreen'},
  {title: 'Validations', name: 'unicorn.components.InputValidationsScreen'},
  {title: 'Inputs Variations', name: 'unicorn.components.InputsScreen'}
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
