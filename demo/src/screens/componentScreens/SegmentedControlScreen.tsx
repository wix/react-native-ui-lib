import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, View, Colors, SegmentedControl, Assets, Spacings, BorderRadiuses} from 'react-native-ui-lib';

const SegmentedControlScreen = () => {
  const onChangeIndex = (segment: string, index: number) => {
    console.warn('Index ' + index + ' of the ' + segment + ' segmentedControl was pressed');
  };

  return (
    <View flex bottom padding-20>
      <View flex center>
        <SegmentedControl
          onChangeIndex={(index: number) => onChangeIndex('first', index)}
          labels={[{title: 'Left'}, {title: 'Right'}]}
        />
        <SegmentedControl
          onChangeIndex={(index: number) => onChangeIndex('second', index)}
          style={styles.container}
          labels={[{title: '1'}, {title: '2'}, {title: '3'}, {title: Assets.emojis.airplane}, {title: '5'}]}
          initialIndex={2}
        />
        <SegmentedControl
          onChangeIndex={(index: number) => onChangeIndex('third', index)}
          style={styles.container}
          activeColor={Colors.red30}
          labels={[
            {
              title: 'Very Long Label with icon',
              iconSource: Assets.icons.search,
              iconStyle: {marginLeft: Spacings.s1, width: 16, height: 16}
            },
            {title: 'Short'}
          ]}
        />
        <SegmentedControl
          onChangeIndex={(index: number) => onChangeIndex('forth', index)}
          style={styles.container}
          labels={[{title: 'With'}, {title: 'Custom'}, {title: 'Colors'}]}
          activeColor={Colors.grey10}
          containerBorderRadius={BorderRadiuses.br20}
          borderRadius={BorderRadiuses.br20}
          backgroundColor={Colors.grey10}
          activeBackgroundColor={Colors.grey40}
          unActiveColor={Colors.grey70}
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
