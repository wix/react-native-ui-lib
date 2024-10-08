import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Text, View, Colors, Image} from 'react-native-ui-lib/core';
import Switch from 'react-native-ui-lib/switch';
import SegmentedControl from 'react-native-ui-lib/segmentedControl';

interface ControlBaseProps<S> {
  state: S;
  setState: React.Dispatch<React.SetStateAction<S>>;
}

interface ToggleControlProps extends ControlBaseProps<boolean> {
  title: string;
  key?: string;
  spread?: boolean;
}

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

export function ToggleControl(props: ToggleControlProps) {
  const {state, setState, title, spread = false, key = 'does not change'} = props;
  return (
    <View row centerV spread={spread} marginB-s4 key={key}>
      <Text $textDefault flex={spread} marginR-s4={!spread}>
        {title}
      </Text>
      <Switch key={key} testID={key} value={state} onValueChange={setState}/>
    </View>
  );
}

export function MobileDeviceWrapper({children}) {
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

  const renderHeader = () => {
    return (
      <View center padding-s2 row>
        <Image
          marginH-s1
          source={{
            uri: 'https://user-images.githubusercontent.com/1780255/105469025-56759000-5ca0-11eb-993d-3568c1fd54f4.png'
          }}
          style={{width: 40, height: 40}}
        />
        <Text text60 marginV-s1>
          Wix React Native UILIB
        </Text>
      </View>
    );
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
      <View style={[styles.simulatorWrapper, simulatorSize]} gap-s2>
        {renderHeader()}
        {children}
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
  }
});
