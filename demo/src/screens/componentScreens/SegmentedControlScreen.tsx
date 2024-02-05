import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Text,
  View,
  Colors,
  Switch,
  SegmentedControl,
  Assets,
  Spacings,
  BorderRadiuses,
  Typography
} from 'react-native-ui-lib';

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
  forth: [{label: 'With'}, {label: 'Custom'}, {label: 'Style'}],
  fifth: [{label: 'Full'}, {label: 'Width'}],
  sixth: [{label: 'Full'}, {label: 'Width'}, {label: 'With'}, {label: 'A'}, {label: 'Very Long Segment'}]
};

const SegmentedControlScreen = () => {
  const [useCustomTypography, setUseCustomTypography] = useState(false);

  const onChangeIndex = useCallback((index: number) => {
    console.warn('Index ' + index + ' of the second segmentedControl was pressed');
  }, []);

  return (
    <View center bottom padding-page>
      <Text text40 $textDefault marginV-s2>
        Segmented Control
      </Text>
      <View marginV-s4 row>
        <Text text80>Use custom Typography:</Text>
        <Switch value={useCustomTypography} onValueChange={setUseCustomTypography} marginL-10/>
      </View>
      <View marginT-s3 center>
        <SegmentedControl
          segments={segments.first}
          segmentLabelStyle={useCustomTypography && styles.customTypography}
        />
        <SegmentedControl
          onChangeIndex={onChangeIndex}
          containerStyle={styles.container}
          segments={segments.second}
          initialIndex={2}
          segmentLabelStyle={useCustomTypography && styles.customTypography}
        />
        <SegmentedControl
          containerStyle={styles.container}
          activeColor={Colors.$textDangerLight}
          segments={segments.third}
          segmentLabelStyle={useCustomTypography && styles.customTypography}
        />
        <SegmentedControl
          containerStyle={styles.container}
          segments={segments.forth}
          activeColor={Colors.$textDefault}
          borderRadius={BorderRadiuses.br20}
          backgroundColor={Colors.$backgroundInverted}
          activeBackgroundColor={Colors.$backgroundNeutralIdle}
          inactiveColor={Colors.$textDisabled}
          style={styles.customStyle}
          segmentsStyle={styles.customSegmentsStyle}
          segmentLabelStyle={useCustomTypography && styles.customTypography}
        />
        <SegmentedControl
          containerStyle={styles.container}
          segments={segments.fifth}
          segmentLabelStyle={useCustomTypography && styles.customTypography}
        />
        <SegmentedControl
          containerStyle={styles.container}
          segments={segments.sixth}
          segmentLabelStyle={useCustomTypography && styles.customTypography}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  customStyle: {
    height: 50,
    width: 300
  },
  customSegmentsStyle: {
    height: 50
  },
  customTypography: {
    ...Typography.text80BO
  }
});

export default SegmentedControlScreen;
