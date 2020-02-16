import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {Navigation} from 'react-native-navigation';

export default class KeyboardInput extends Component {
  static propTypes = {
    componentId: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.onPressBodyMessage = this.onPressBodyMessage.bind(this);
  }

  onPressBodyMessage() {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'screens.innerScreen',
        passProps: {
          message: 'In the secondary tab, the keyboard input is inside a pushed screen, yet it works nonetheless! :-)',
        },
        options: {
          topBar: {
            title: {
              text: 'Second screen',
            },
          },
        },
      },
    });
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={this.onPressBodyMessage}>
          <Text style={{fontSize: 21}}>Tap for more keyboard fun...</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
