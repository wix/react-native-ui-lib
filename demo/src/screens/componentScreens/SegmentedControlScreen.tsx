import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Text, View, Colors, SegmentedControl} from 'react-native-ui-lib'; //eslint-disable-line

class SegmentedControlScreen extends Component {
  render() {
    return (
      <View flex bottom padding-20>
        <View flex center>
          <SegmentedControl leftLabel={'Left'} rightLabel={'Right'}/>
          <SegmentedControl style={styles.container} leftLabel={'Very Long Label'} rightLabel={'Short'}/>
          <SegmentedControl style={styles.container} leftLabel={'Custom'} rightLabel={'Color'} color={Colors.red30}/>
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
