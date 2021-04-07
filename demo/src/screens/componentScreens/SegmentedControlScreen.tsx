import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, View, Colors, SegmentedControl, Assets, Spacings, BorderRadiuses} from 'react-native-ui-lib';

const segments = {
  first: [{label: 'Left'}, {label: 'Right'}],
  second: [{label: '1'}, {label: '2'}, {label: '3'}, {label: Assets.emojis.airplane}, {label: '5'}],
  third: [
    {
      label: 'Very Long Label with icon',
      iconSource: Assets.icons.search,
      iconStyle: {marginLeft: Spacings.s1, width: 16, height: 16},
      iconOnRight: true
    },
    {label: 'Short'}
  ],
  forth: [{label: 'With'}, {label: 'Custom'}, {label: 'Colors'}]
};

const SegmentedControlScreen = () => {
  const onChangeIndex = (segment: string, index: number) => {
    console.warn('Index ' + index + ' of the ' + segment + ' segmentedControl was pressed');
  };

  return (
    <View flex bottom padding-20>
      <View flex center>
        <SegmentedControl onChangeIndex={(index: number) => onChangeIndex('first', index)} segments={segments.first}/>
        <SegmentedControl
          onChangeIndex={(index: number) => onChangeIndex('second', index)}
          containerStyle={styles.container}
          segments={segments.second}
          initialIndex={2}
        />
        <SegmentedControl
          onChangeIndex={(index: number) => onChangeIndex('third', index)}
          containerStyle={styles.container}
          activeColor={Colors.red30}
          segments={segments.third}
        />
        <SegmentedControl
          onChangeIndex={(index: number) => onChangeIndex('forth', index)}
          containerStyle={styles.container}
          segments={segments.forth}
          activeColor={Colors.grey10}
          borderRadius={BorderRadiuses.br20}
          backgroundColor={Colors.grey10}
          activeBackgroundColor={Colors.grey40}
          inactiveColor={Colors.grey70}
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
