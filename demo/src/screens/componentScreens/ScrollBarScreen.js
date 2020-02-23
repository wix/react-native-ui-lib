import React, {Component} from 'react';
import {View, Text, ScrollBar, Button} from 'react-native-ui-lib';
class ScrollBarScreen extends Component {
  state = {
    selectedIndex: 0
  };

  focus = ({index}) => {
    this.setState({selectedIndex: index});
  };

  render() {
    const {selectedIndex} = this.state;
    return (
      <View flex>
        <View padding-s5>
          <Text text40>ScrollBar</Text>
        </View>
        <ScrollBar focusIndex={selectedIndex}>
          {[
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ].map((item, index) => {
            return <Button key={item} index={index} label={item} size="small" onPress={this.focus} marginR-s2/>;
          })}
        </ScrollBar>
      </View>
    );
  }
}

export default ScrollBarScreen;
