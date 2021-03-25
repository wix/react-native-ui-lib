import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Text, View, Colors, SegmentedControl} from 'react-native-ui-lib'; 

class SegmentedControlScreen extends Component {

  onChangeIndex = (segment: string, index: number) => {
    console.warn('Index ' + index + ' of the ' + segment + ' segmentedControl was pressed');
  }

  render() {
    return (
      <View flex bottom padding-20>
        <View flex center>
          <SegmentedControl onChangeIndex={(index: number) => this.onChangeIndex('first', index)} labels={['Right', 'Left']}/>
          <SegmentedControl onChangeIndex={(index: number) => this.onChangeIndex('second', index)} style={styles.container} labels={['One', 'Two', 'Three', 'Four', 'Five']}/>
          <SegmentedControl onChangeIndex={(index: number) => this.onChangeIndex('third', index)} style={styles.container} labels={['Very Very Long Label', 'Short']}/>
          <SegmentedControl onChangeIndex={(index: number) => this.onChangeIndex('forth', index)} style={styles.container} labels={['Custom', 'Color']} color={Colors.red30}/>
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
