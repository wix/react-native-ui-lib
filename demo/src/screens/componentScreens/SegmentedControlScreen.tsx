import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, View, Colors, SegmentedControl} from 'react-native-ui-lib';

const SegmentedControlScreen = () => {
  const onChangeIndex = (segment: string, index: number) => {
    console.warn('Index ' + index + ' of the ' + segment + ' segmentedControl was pressed');
  };

  return (
    <View flex bottom padding-20>
      <View flex center>
        <SegmentedControl onChangeIndex={(index: number) => onChangeIndex('first', index)} labels={['Left', 'Right']}/>
        <SegmentedControl
          onChangeIndex={(index: number) => onChangeIndex('second', index)}
          style={styles.container}
          labels={['1', '2', '3', '4', '5']}
          initialIndex={2}
        />
        <SegmentedControl
          onChangeIndex={(index: number) => onChangeIndex('third', index)}
          style={styles.container}
          labels={['Very Very Long Label', 'Short']}
        />
        <SegmentedControl
          onChangeIndex={(index: number) => onChangeIndex('forth', index)}
          style={styles.container}
          labels={['Custom', 'Color']}
          color={Colors.red30}
        />
      </View>
      <Text text40 dark10>
        Segmented Control
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  }
});

export default SegmentedControlScreen;
