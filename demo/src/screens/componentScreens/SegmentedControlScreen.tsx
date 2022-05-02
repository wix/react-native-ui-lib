import React, {useCallback} from 'react';
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
  forth: [{label: 'With'}, {label: 'Custom'}, {label: 'Colors'}],
  fifth: [{label: 'Full'}, {label: 'Width'}],
  sixth: [{label: 'Full'}, {label: 'Width'}, {label: 'With'}, {label: 'A'}, {label: 'Very Long Segment'}]
};

const SegmentedControlScreen = () => {

  const onChangeIndex = useCallback((index: number) => {
    console.warn('Index ' + index + ' of the second segmentedControl was pressed');
  }, []);

  return (
    <View flex bottom padding-page>
      <View flex centerV>
        <View center>
          <SegmentedControl segments={segments.first}/>
          <SegmentedControl
            onChangeIndex={onChangeIndex}
            containerStyle={styles.container}
            segments={segments.second}
            initialIndex={2}
          />
          <SegmentedControl
            containerStyle={styles.container}
            activeColor={Colors.$textDangerLight}
            segments={segments.third}
          />
          <SegmentedControl
            containerStyle={styles.container}
            segments={segments.forth}
            activeColor={Colors.$textDefault}
            borderRadius={BorderRadiuses.br20}
            backgroundColor={Colors.$backgroundInverted}
            activeBackgroundColor={Colors.$backgroundNeutralIdle}
            inactiveColor={Colors.$textDisabled}
          />
        </View>
        <SegmentedControl
          containerStyle={styles.container}
          segments={segments.fifth}
        />
        <SegmentedControl
          containerStyle={styles.container}
          segments={segments.sixth}
        />
      </View>
      <Text text40 $textDefault>
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
