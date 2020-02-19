import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity} from 'react-native-ui-lib';

export default class KeyboardView extends Component {
  static propTypes = {
    title: PropTypes.string,
    backgroundColor: PropTypes.string,
    onPress: PropTypes.func
  };

  render() {
    const {title, backgroundColor, onPress} = this.props;

    return (
      <View flex center style={backgroundColor && {backgroundColor}}>
        <Text white>{title}</Text>
        <TouchableOpacity testID={'click-me'} padding-20 marginT-30 bg-white onPress={onPress}>
          <Text>Click Me!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
