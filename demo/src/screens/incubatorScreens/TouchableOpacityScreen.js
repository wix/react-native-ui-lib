import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {View, Text, Colors, Incubator} from 'react-native-ui-lib';

// TODO: Android - multiple clicks on the example that allows long press button (maybe dragging is also involved) -->
// long press on it --> sometimes the counter just start ticking up
// (happens on 2.17.0 as well but more rare, with gestureHandlerRootHOC)
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

  renderRNTouchableExample = () => {
    return (
      <View row centerV marginT-20>
        <Text marginR-14>RN TouchableOpacity</Text>
        <TouchableOpacity
          onPress={() => {
            console.warn('onPress');
          }}
          onLongPress={() => {
            console.warn('onLongPress');
          }}
        >
          <View style={{backgroundColor: Colors.green40, width: 100, height: 34, borderRadius: 22}}/>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {counter, longPressCounter} = this.state;
    return (
      <View bg-grey80 flex padding-20>
        <Text text40>Native TouchableOpacity</Text>

        <Text text50 center marginT-20>
          COUNTER: {counter}
        </Text>
        <Text text50 center marginT-20>
          LONG PRESS COUNTER: {longPressCounter}
        </Text>

        <Incubator.TouchableOpacity
          marginT-20
          onPress={this.onPress}
          onLongPress={this.onLongPress}
          backgroundColor={Colors.blue30}
          feedbackColor={Colors.blue50}
          style={{alignItems: 'center', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 50}}
          activeOpacity={1}
          activeScale={0.98}
        >
          <Text white>TouchableOpacity</Text>
        </Incubator.TouchableOpacity>
        <Incubator.TouchableOpacity
          marginT-20
          paddingH-20
          paddingV-8
          br100
          center
          onPress={this.onPress}
          backgroundColor={Colors.orange30}
          feedbackColor={Colors.yellow20}
          activeOpacity={1}
          activeScale={0.98}
        >
          <Text white>TouchableOpacity (without LongPress)</Text>
        </Incubator.TouchableOpacity>
        {this.renderRNTouchableExample()}
      </View>
    );
  }
}

export default TouchableOpacityScreen;
