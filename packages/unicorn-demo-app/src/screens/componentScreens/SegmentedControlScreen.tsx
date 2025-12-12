import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Text,
  View,
  Colors,
  SegmentedControl,
  Assets,
  Spacings,
  BorderRadiuses,
  Typography,
  SegmentedControlItemProps
} from 'react-native-ui-lib';

const segments: Record<string, Array<SegmentedControlItemProps>> = {
  first: [{label: 'Default'}, {label: 'Form'}],
  second: [{label: '1'}, {label: '2'}, {label: '3'}, {label: Assets.emojis.airplane}, {label: '5'}],
  third: [
    {
      label: 'Very Long Label with icon',
      iconSource: Assets.icons.demo.search,
      iconStyle: {marginLeft: Spacings.s1, width: 16, height: 16},
      iconOnRight: true
    },
    {label: 'Short'}
  ],
  forth: [{label: 'With'}, {label: 'Custom'}, {label: 'Style'}],
  fifth: [{label: 'Full'}, {label: 'Width'}],
  sixth: [{label: 'Full'}, {label: 'Width'}, {label: 'With'}, {label: 'A'}, {label: 'Very Long Segment'}],
  seventh: [{label: '$'}, {label: '%'}],
  eighth: [
    {label: 'Plus', iconSource: Assets.icons.demo.plus},
    {label: 'Minus', iconSource: Assets.icons.demo.minus},
    {label: 'Check', iconSource: Assets.icons.demo.check}
  ],
  ninth: [{label: 'with'}, {label: 'a'}, {label: 'label'}]
};

const SegmentedControlScreen = () => {
  const onChangeIndex = useCallback((index: number) => {
    console.warn('Index ' + index + ' of the second segmentedControl was pressed');
  }, []);
  const [screenPreset, setScreenPreset] = useState(SegmentedControl.presets.DEFAULT);

  return (
    <View flex bottom padding-page>
      <Text center text40 $textDefault>
        Segmented Control
      </Text>
      <View flex marginT-s8>
        <View center>
          <View row gap-s10 bottom>
            <Text text70>Preset:</Text>
            <SegmentedControl
              segments={segments.first}
              preset={screenPreset}
              onChangeIndex={index =>
                setScreenPreset(index === 0 ? SegmentedControl.presets.DEFAULT : SegmentedControl.presets.FORM)
              }
              initialIndex={screenPreset === SegmentedControl.presets.DEFAULT ? 0 : 1}
            />
          </View>
          <SegmentedControl
            onChangeIndex={onChangeIndex}
            containerStyle={styles.container}
            segments={segments.second}
            initialIndex={2}
            preset={screenPreset}
          />
          <SegmentedControl
            containerStyle={styles.container}
            activeColor={Colors.$textDangerLight}
            outlineColor={Colors.$textDangerLight}
            segments={segments.third}
            preset={screenPreset}
          />
        </View>
        <SegmentedControl containerStyle={styles.container} segments={segments.fifth} preset={screenPreset}/>
        <SegmentedControl containerStyle={styles.container} segments={segments.sixth} preset={screenPreset}/>
        <Text marginT-s4 center>
          Custom Typography
        </Text>
        <SegmentedControl
          containerStyle={styles.container}
          segments={segments.seventh}
          segmentLabelStyle={styles.customTypography}
          preset={screenPreset}
        />
        <Text center marginT-s4>
          With Icons
        </Text>
        <SegmentedControl segments={segments.eighth} preset={screenPreset}/>
        <Text marginT-s4 center>
          Custom Styling
        </Text>
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
        />
        <Text marginT-s4 center>
          With a label
        </Text>
        <SegmentedControl
          containerStyle={styles.container}
          segments={segments.ninth}
          preset={screenPreset}
          label="Control label"
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
