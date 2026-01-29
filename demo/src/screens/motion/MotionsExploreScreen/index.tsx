import React, {useMemo, useState} from 'react';
import {LayoutChangeEvent, ScrollView, ViewStyle} from 'react-native';
import {Colors, View, Button} from 'react-native-ui-lib';
import Motion, {type MotionSpecs, Motions} from 'react-native-motion-lib';

const PLAYGROUND_ELEMENT_SIZE = 100;

function PlaygroundElement({style}: {style?: ViewStyle} = {}) {
  const baseStyle = {
    width: PLAYGROUND_ELEMENT_SIZE,
    height: PLAYGROUND_ELEMENT_SIZE,
    borderRadius: 10,
    backgroundColor: Colors.$backgroundGeneralHeavy,
    justifyContent: 'center' as const,
    alignItems: 'center' as const
  } as ViewStyle;
  return <View style={[baseStyle, style]}/>;
}

export default function MotionsExploreScreen() {
  const [playgroundContainerSize, setPlaygroundContainerSize] = useState({width: 0, height: 0});
  const [trigger, setTrigger] = useState<{
    name: string;
    motion: MotionSpecs;
    key: number;
  } | null>(null);

  const motionEntries = useMemo<Array<{name: string; createMotion:() => MotionSpecs}>>(() => [
    {name: 'Bounce Up', createMotion: () => Motions.BounceUp(PLAYGROUND_ELEMENT_SIZE * 0.6)},
    {name: 'Roll In Left', createMotion: () => Motions.RollInLeft(playgroundContainerSize.width / 2 + PLAYGROUND_ELEMENT_SIZE / 2)},
    {name: 'Slide In Up', createMotion: () => Motions.SlideInUp(playgroundContainerSize.height / 2 + PLAYGROUND_ELEMENT_SIZE * 0.75)}
  ], [playgroundContainerSize]);

  const onMotionPress = (name: string, createMotion: () => MotionSpecs) => {
    setTrigger({
      name,
      motion: createMotion(),
      key: (trigger?.key ?? 0) + 1
    });
  };

  return (
    <ScrollView contentContainerStyle={{padding: 20}}>
      <View flex useSafeArea>
        <View center marginB-s6>
          <View
            padding-s32
            onLayout={(event: LayoutChangeEvent) => 
              setPlaygroundContainerSize(event.nativeEvent.layout)
            }
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
              <Motion.View key={trigger.key} motion={trigger.motion}>
                <PlaygroundElement/>
              </Motion.View>
            ) : (
              <PlaygroundElement/>
            )}
          </View>
        </View>

        <View row flex centerH style={{flexWrap: 'wrap'}}>
          {motionEntries.map(({name, createMotion}) => (
            <Button
              key={name}
              label={name}
              size={Button.sizes.small}
              marginR-s2
              marginB-s2
              onPress={() => onMotionPress(name, createMotion)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
