import React, {useState} from 'react';
import {ScrollView, ViewStyle} from 'react-native';
import {Colors, Text, View, Button} from 'react-native-ui-lib';
import {Behaviors, BehaviorView, type Behavior} from 'react-native-motion-lib';

function PlaygroundElement({style}: {style?: ViewStyle} = {}) {
  const baseStyle = {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: Colors.$backgroundGeneralHeavy,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 5
  } as ViewStyle;
  return <View style={[baseStyle, style]}/>;
}

const BEHAVIOR_ENTRIES: Array<{name: string; createBehavior: () => Behavior}> = [
  {name: 'Bounce Up', createBehavior: () => Behaviors.BounceUp(80)},
  {name: 'Roll In Left', createBehavior: () => Behaviors.RollInLeft(100)}
];

export default function BehaviorsScreen() {
  const [trigger, setTrigger] = useState<{
    name: string;
    behavior: Behavior;
    key: number;
  } | null>(null);

  const onPressBehavior = (name: string, createBehavior: () => Behavior) => {
    setTrigger({
      name,
      behavior: createBehavior(),
      key: (trigger?.key ?? 0) + 1
    });
  };

  return (
    <ScrollView contentContainerStyle={{padding: 20}}>
      <View flex useSafeArea>
        <Text text80 marginB-s3>
          Tap a behavior to play its animation
        </Text>

        <View center marginB-s6>
          <View
            padding-s32
            style={{
              borderWidth: 1,
              borderColor: Colors.$outlineDefault,
              borderRadius: 8,
              borderStyle: 'dashed',
              backgroundColor: Colors.$backgroundNeutralLight,
              alignItems: 'center',
              justifyContent: 'center',
              height: 250,
              width: 250,
              overflow: 'hidden'
            }}
          >
            {trigger ? (
              <BehaviorView
                key={trigger.key}
                behavior={trigger.behavior}
              >
                <PlaygroundElement/>
              </BehaviorView>
            ) : (
              <PlaygroundElement/>
            )}
          </View>
        </View>

        <View row flex centerH style={{flexWrap: 'wrap'}}>
          {BEHAVIOR_ENTRIES.map(({name, createBehavior}) => (
            <Button
              key={name}
              label={name}
              size={Button.sizes.small}
              marginR-s2
              marginB-s2
              onPress={() => onPressBehavior(name, createBehavior)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
