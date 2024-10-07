import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Colors, Spacings} from 'react-native-ui-lib/core';
import SegmentedControl from 'react-native-ui-lib/segmentedControl';

interface SimulatorSize {
  width: number | undefined;
  height: number | undefined;
}

enum SimulatorTypes {
  MOBILE = 'MOBILE',
  TABLET = 'TABLET'
}

const simulatorOptions = [
  {label: 'Mobile', value: SimulatorTypes.MOBILE},
  {label: 'Tablet', value: SimulatorTypes.TABLET}
];

const MobileDeviceWrapper = ({children}) => {
  const [simulatorSize, setSimulatorSize] = useState<SimulatorSize>({width: 340, height: 754});
  const [type, setType] = useState<SimulatorTypes>(SimulatorTypes.MOBILE);

  useEffect(() => {
    changeType();
  }, [type]);

  function changeType() {
    switch (type) {
      case SimulatorTypes.MOBILE:
      default:
        setSimulatorSize({width: 340, height: 754});
        break;
      case SimulatorTypes.TABLET:
        setSimulatorSize({width: 900, height: 754});
        break;
    }
  }
  const onPress = (type: SimulatorTypes) => {
    setType?.(type);
  };

  return (
    <View gap-s3>
      <View gap-s1 marginV-s1 center>
        <Text marginR-s3 style={styles.typesTitle}>
          Choose Type
        </Text>
        <SegmentedControl
          initialIndex={0}
          segments={simulatorOptions}
          onChangeIndex={index => {
            onPress(simulatorOptions[index].value);
          }}
          backgroundColor={Colors.$backgroundDefault}
        />
      </View>
      <View style={[styles.simulatorWrapper, simulatorSize]}>{children}</View>
    </View>
  );
};

export default MobileDeviceWrapper;

const styles = StyleSheet.create({
  typesTitle: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  simulatorWrapper: {
    alignSelf: 'center',
    borderRadius: 40,
    borderWidth: 4,
    borderColor: Colors.$outlineDisabledHeavy,
    marginVertical: Spacings.s2,
    overflow: 'hidden'
  }
});
