import React, {Component} from 'react';
import {View, Text, Colors, Incubator} from 'react-native-ui-lib';

class TouchableOpacityScreen extends Component {
  state = {
    counter: 0,
    longPressCounter: 0
  };

  onPress = () => {
    this.setState({counter: this.state.counter + 1});
  };

  onLongPress = () => {
    this.setState({longPressCounter: this.state.longPressCounter + 1});
  };

  renderExample(title, props) {
    return (
      <View row marginT-20 centerV>
        <Text text70 marginR-20>
          {title}
        </Text>
        <Incubator.TouchableOpacity
          onPress={this.onPress}
          onLongPress={this.onLongPress}
          backgroundColor={Colors.blue30}
          style={{alignItems: 'center', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 50}}
          activeOpacity={1}
          {...props}
        >
          <Text white>Button</Text>
        </Incubator.TouchableOpacity>
      </View>
    );
  }

  render() {
    const {counter, longPressCounter} = this.state;
    return (
      <View bg-dark80 flex padding-20>
        <Text text40>Native TouchableOpacity</Text>

        <Text text50 center marginT-20>
          COUNTER: {counter}
        </Text>
        <Text text50 center marginT-20>
          LONG PRESS COUNTER: {longPressCounter}
        </Text>

        {this.renderExample('feedbackColor', {backgroundColor: Colors.red30, feedbackColor: Colors.red10})}
        {this.renderExample('activeScale', {activeScale: 0.95})}
        {this.renderExample('activeOpacity', {activeOpacity: 0.6})}
      </View>
    );
  }
}

export default TouchableOpacityScreen;
