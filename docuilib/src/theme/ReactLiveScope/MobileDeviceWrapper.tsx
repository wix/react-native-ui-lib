import React, {useState, useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Text, View, Colors, Image} from 'react-native-ui-lib/core';
import SegmentedControl from 'react-native-ui-lib/segmentedControl';

interface SimulatorSize {
  width: number | undefined;
  height: number | undefined;
}

enum SimulatorTypes {
  MOBILE = 'MOBILE',
  TABLET = 'TABLET'
}

const SimulatorSizes = {
  [SimulatorTypes.MOBILE]: {width: 340, height: 754},
  [SimulatorTypes.TABLET]: {width: 900, height: 754}
};

const simulatorOptions = [
  {label: 'Mobile', value: SimulatorTypes.MOBILE},
  {label: 'Tablet', value: SimulatorTypes.TABLET}
];

export function MobileDeviceWrapper({children}) {
  const [simulatorSize, setSimulatorSize] = useState<SimulatorSize>(SimulatorSizes[SimulatorTypes.MOBILE]);
  const [type, setType] = useState<SimulatorTypes>(SimulatorTypes.MOBILE);

  useEffect(() => {
    setSimulatorSize(SimulatorSizes[type]);
  }, [type]);

  const renderHeader = () => (
    <View center padding-s2 row>
      <Image
        marginH-s1
        source={{
          uri: 'https://user-images.githubusercontent.com/1780255/105469025-56759000-5ca0-11eb-993d-3568c1fd54f4.png'
        }}
        style={styles.uilibLogo}
      />
      <Text text60 marginV-s1>
        Wix React Native UILIB
      </Text>
    </View>
  );

  const wrapperStyle = useMemo(() => [styles.simulatorWrapper, simulatorSize], [simulatorSize]);

  return (
    <View gap-s3>
      <View gap-s1 marginV-s1 center>
        <Text marginR-s3 style={styles.typesTitle}>
          Choose Type
        </Text>
        <SegmentedControl
          initialIndex={0}
          segments={simulatorOptions}
          onChangeIndex={index => setType(simulatorOptions[index].value)}
          backgroundColor={Colors.$backgroundDefault}
        />
      </View>
      <View gap-s2 style={wrapperStyle}>
        {renderHeader()}
        <div>{children}</div>
      </View>
    </View>
  );
}

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
    overflow: 'hidden'
  },
  uilibLogo: {
    width: 40,
    height: 40
  }
});
