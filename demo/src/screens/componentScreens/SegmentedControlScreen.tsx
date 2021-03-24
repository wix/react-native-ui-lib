import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Text, View, Colors, SegmentedControl} from 'react-native-ui-lib'; //eslint-disable-line

class SegmentedControlScreen extends Component {
  render() {
    return (
      <View flex bottom padding-20>
        <View flex center>
          <SegmentedControl labels={['Right', 'Left']}/>
          <SegmentedControl style={styles.container} labels={['One', 'Two', 'Three', 'Four', 'Five']}/>
          <SegmentedControl style={styles.container} labels={['Very Very Long Label', 'Short']}/>
          <SegmentedControl style={styles.container} labels={['Custom', 'Color']} color={Colors.red30}/>
        </View>
        <Text text40 dark10>
          Segmented Control
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  }
});

export default SegmentedControlScreen;
